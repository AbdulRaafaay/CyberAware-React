const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');
const catchAsync = require('../middleware/catchAsync');

// @desc    Upload single image
// @route   POST /api/upload
// @access  Private
const uploadImage = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const { filename, path: filepath, mimetype, size } = req.file;
  const { incidentId = null } = req.body;

  const imageDoc = await Image.create({
    filename,
    path: filepath,
    mimetype,
    size,
    incidentId,
    uploadedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: {
      id: imageDoc._id,
      filename,
      path: filepath,
      mimetype,
      size,
      incidentId,
    },
  });
});

// @desc    Delete image
// @route   DELETE /api/upload/:id
// @access  Private (owner or admin)
const deleteImage = catchAsync(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return res.status(404).json({ success: false, message: 'Image not found' });
  }

  const isOwner = image.uploadedBy && image.uploadedBy.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this image' });
  }

  // Remove file from disk if exists
  if (image.path && fs.existsSync(image.path)) {
    fs.unlinkSync(image.path);
  }

  await image.deleteOne();

  res.status(200).json({ success: true, message: 'Image deleted' });
});

module.exports = {
  uploadImage,
  deleteImage,
};

