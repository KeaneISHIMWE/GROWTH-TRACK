const express = require('express');
const router = express.Router();
const { 
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
} = require('../controllers/leadsController');
const { authenticate, authorizeRole } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/leads - Get all leads
router.get('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getAllLeads);

// GET /api/leads/:id - Get a specific lead
router.get('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getLeadById);

// POST /api/leads - Create a new lead
router.post('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), createLead);

// PUT /api/leads/:id - Update a lead
router.put('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), updateLead);

// DELETE /api/leads/:id - Delete a lead
router.delete('/:id', authorizeRole(['ADMIN']), deleteLead);

module.exports = router;