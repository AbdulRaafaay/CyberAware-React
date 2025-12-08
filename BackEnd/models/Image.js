const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, 'Filename is required'],
      trim: true,
    },
    path: {
      type: String,
      required: [true, 'File path is required'],
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Image must be associated with a user'],
    },
    incidentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Incident',
      default: null, // Optional - can be null for profile pictures, etc.
    },
    size: {
      type: Number, // Size in bytes
      default: 0,
    },
    mimetype: {
      type: String,
      default: 'image/jpeg',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for efficient queries
imageSchema.index({ uploadedBy: 1 });
imageSchema.index({ incidentId: 1 });
imageSchema.index({ createdAt: -1 }); // For sorting by upload date

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
