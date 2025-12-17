const express = require('express');
const router = express.Router();
const { 
  getAllRevenue,
  getRevenueById,
  createRevenue,
  updateRevenue,
  deleteRevenue
} = require('../controllers/revenueController');
const { authenticate, authorizeRole } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/revenue - Get all revenue entries
router.get('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getAllRevenue);

// GET /api/revenue/:id - Get a specific revenue entry
router.get('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getRevenueById);

// POST /api/revenue - Create a new revenue entry
router.post('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), createRevenue);

// PUT /api/revenue/:id - Update a revenue entry
router.put('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), updateRevenue);

// DELETE /api/revenue/:id - Delete a revenue entry
router.delete('/:id', authorizeRole(['ADMIN']), deleteRevenue);

module.exports = router;