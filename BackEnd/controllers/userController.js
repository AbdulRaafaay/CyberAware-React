const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Incident = require('../models/Incident');
const catchAsync = require('../middleware/catchAsync');
const { generateToken, generateRefreshToken } = require('../utils/generateToken');

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
const getProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ success: true, data: user });
});

// @desc    Update profile
// @route   PATCH /api/users/me
// @access  Private
const updateProfile = catchAsync(async (req, res) => {
  const updates = ['name', 'email', 'avatar'];
  const user = await User.findById(req.user._id);

  updates.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  // If email is being changed, ensure uniqueness
  if (req.body.email && req.body.email !== req.user.email) {
    const existing = await User.findOne({ email: req.body.email });
    if (existing && existing._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
  }

  await user.save();
  res.status(200).json({ success: true, data: user });
});

// @desc    Change password
// @route   PATCH /api/users/change-password
// @access  Private
const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });
  }

  user.password = newPassword;
  await user.save();

  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
    data: { token, refreshToken },
  });
});

// @desc    User dashboard stats
// @route   GET /api/users/dashboard
// @access  Private
const getDashboard = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const [totalIncidents, recentIncidents, incidentsByYear] = await Promise.all([
    Incident.countDocuments({ createdBy: userId }),
    Incident.find({ createdBy: userId }).sort('-createdAt').limit(5),
    Incident.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: '$year', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalIncidents,
      recentIncidents,
      incidentsByYear,
    },
  });
});

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getDashboard,
};

