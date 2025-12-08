const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', incidentController.getAllIncidents);
router.get('/:id', incidentController.getIncident);

// Protected routes
router.post('/', protect, incidentController.createIncident);
router.patch('/:id', protect, incidentController.updateIncident);
router.delete('/:id', protect, incidentController.deleteIncident);

module.exports = router;

