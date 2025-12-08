const Incident = require('../models/Incident');
const catchAsync = require('../middleware/catchAsync');

// @desc    Create new incident
// @route   POST /api/incidents
// @access  Private
const createIncident = catchAsync(async (req, res) => {
  const { name, year, description, timeline, impact, images = [] } = req.body;

  const incident = await Incident.create({
    name,
    year,
    description,
    timeline,
    impact,
    images,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, data: incident });
});

// @desc    Get all incidents with pagination, search, filter, sort
// @route   GET /api/incidents
// @access  Public
const getAllIncidents = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const { search, year, createdBy, sort } = req.query;

  const queryObj = {};

  // Search by text fields
  if (search) {
    queryObj.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { impact: { $regex: search, $options: 'i' } },
    ];
  }

  // Filter by year
  if (year) {
    queryObj.year = year;
  }

  // Filter by owner (if provided)
  if (createdBy) {
    queryObj.createdBy = createdBy;
  }

  let incidentsQuery = Incident.find(queryObj);

  // Sorting
  if (sort) {
    // e.g., ?sort=-year,name
    const sortBy = sort.split(',').join(' ');
    incidentsQuery = incidentsQuery.sort(sortBy);
  } else {
    incidentsQuery = incidentsQuery.sort('-createdAt');
  }

  // Pagination
  incidentsQuery = incidentsQuery.skip(skip).limit(limit);

  const [incidents, total] = await Promise.all([
    incidentsQuery,
    Incident.countDocuments(queryObj),
  ]);

  res.status(200).json({
    success: true,
    count: incidents.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: incidents,
  });
});

// @desc    Get single incident by id
// @route   GET /api/incidents/:id
// @access  Public
const getIncident = catchAsync(async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  res.status(200).json({ success: true, data: incident });
});

// Ownership or admin check helper
const ensureOwnershipOrAdmin = (incident, user) => {
  if (!incident.createdBy) return false;
  return incident.createdBy.toString() === user._id.toString() || user.role === 'admin';
};

// @desc    Update incident
// @route   PATCH /api/incidents/:id
// @access  Private (owner or admin)
const updateIncident = catchAsync(async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  if (!ensureOwnershipOrAdmin(incident, req.user)) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this incident' });
  }

  const allowedFields = ['name', 'year', 'description', 'timeline', 'impact', 'images'];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      incident[field] = req.body[field];
    }
  });

  await incident.save();

  res.status(200).json({ success: true, data: incident });
});

// @desc    Delete incident
// @route   DELETE /api/incidents/:id
// @access  Private (owner or admin)
const deleteIncident = catchAsync(async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  if (!ensureOwnershipOrAdmin(incident, req.user)) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this incident' });
  }

  await incident.deleteOne();

  res.status(200).json({ success: true, message: 'Incident deleted' });
});

module.exports = {
  createIncident,
  getAllIncidents,
  getIncident,
  updateIncident,
  deleteIncident,
};

