const express = require('express');
const router = express.Router();
const { 
  getAllActivities,
  getActivityById,
  getActivitiesByLeadId,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activitiesController');
const { authenticate, authorizeRole } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/activities - Get all activities
router.get('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getAllActivities);

// GET /api/activities/:id - Get a specific activity
router.get('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getActivityById);

// GET /api/activities/lead/:leadId - Get activities by lead ID
router.get('/lead/:leadId', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getActivitiesByLeadId);

// POST /api/activities - Create a new activity
router.post('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), createActivity);

// PUT /api/activities/:id - Update an activity
router.put('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), updateActivity);

// DELETE /api/activities/:id - Delete an activity
router.delete('/:id', authorizeRole(['ADMIN']), deleteActivity);

module.exports = router;