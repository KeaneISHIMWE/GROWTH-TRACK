const express = require('express');
const router = express.Router();
const { 
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
} = require('../controllers/dealsController');
const { authenticate, authorizeRole } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/deals - Get all deals
router.get('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getAllDeals);

// GET /api/deals/:id - Get a specific deal
router.get('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getDealById);

// POST /api/deals - Create a new deal
router.post('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), createDeal);

// PUT /api/deals/:id - Update a deal
router.put('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), updateDeal);

// DELETE /api/deals/:id - Delete a deal
router.delete('/:id', authorizeRole(['ADMIN']), deleteDeal);

module.exports = router;