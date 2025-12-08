const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const { protect } = require('../middleware/auth');
const { cache } = require('../middleware/cache');

/**
 * @swagger
 * /api/incidents:
 *   get:
 *     summary: Get all incidents with pagination and filters
 *     tags: [Incidents]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, description, or impact
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter by year
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: Sort field (prefix with - for descending)
 *     responses:
 *       200:
 *         description: List of incidents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Incident'
 */
router.get('/', cache(300), incidentController.getAllIncidents); // Cache for 5 minutes

/**
 * @swagger
 * /api/incidents/{id}:
 *   get:
 *     summary: Get incident by ID
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Incident ID
 *     responses:
 *       200:
 *         description: Incident details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Incident'
 *       404:
 *         description: Incident not found
 */
router.get('/:id', cache(300), incidentController.getIncident); // Cache for 5 minutes

/**
 * @swagger
 * /api/incidents:
 *   post:
 *     summary: Create a new incident
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - year
 *               - description
 *               - timeline
 *               - impact
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: WannaCry Ransomware Attack
 *               year:
 *                 type: string
 *                 pattern: '^\\d{4}$'
 *                 example: '2017'
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 example: A worldwide ransomware attack...
 *               timeline:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       example: '2017-05-12'
 *                     event:
 *                       type: string
 *                       example: Initial outbreak
 *                     details:
 *                       type: string
 *                       example: The attack began...
 *               impact:
 *                 type: string
 *                 example: Affected over 200,000 computers
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Incident created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, incidentController.createIncident);

router.patch('/:id', protect, incidentController.updateIncident);
router.delete('/:id', protect, incidentController.deleteIncident);

module.exports = router;

