const mongoose = require('mongoose');

// Timeline subdocument schema
const timelineEventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'Timeline event date is required'],
    trim: true,
  },
  event: {
    type: String,
    required: [true, 'Timeline event name is required'],
    trim: true,
    maxlength: [100, 'Event name cannot exceed 100 characters'],
  },
  details: {
    type: String,
    required: [true, 'Timeline event details are required'],
    trim: true,
    maxlength: [1000, 'Event details cannot exceed 1000 characters'],
  },
});

const incidentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an incident name'],
      trim: true,
      minlength: [3, 'Incident name must be at least 3 characters'],
      maxlength: [200, 'Incident name cannot exceed 200 characters'],
    },
    year: {
      type: String,
      required: [true, 'Please provide the year of the incident'],
      trim: true,
      match: [/^\d{4}$/, 'Year must be in YYYY format (e.g., 2017)'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    timeline: {
      type: [timelineEventSchema],
      required: [true, 'Please provide at least one timeline event'],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'At least one timeline event is required',
      },
    },
    impact: {
      type: String,
      required: [true, 'Please provide the impact of the incident'],
      trim: true,
      maxlength: [1000, 'Impact description cannot exceed 1000 characters'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Incident must be associated with a user'],
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for search, sorting, and filtering
incidentSchema.index({ name: 'text', description: 'text', impact: 'text' }); // Text search
incidentSchema.index({ year: 1 }); // For sorting/filtering by year
incidentSchema.index({ createdBy: 1 }); // For finding incidents by user
incidentSchema.index({ createdAt: -1 }); // For sorting by creation date

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
