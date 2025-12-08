const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validate, updateProfileSchema, changePasswordSchema } = require('../middleware/validate');

router.get('/me', protect, userController.getProfile);
router.patch('/me', protect, validate(updateProfileSchema), userController.updateProfile);
router.patch('/change-password', protect, validate(changePasswordSchema), userController.changePassword);
router.get('/dashboard', protect, userController.getDashboard);

// Admin routes can be added later with authorize('admin')

module.exports = router;

