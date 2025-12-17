const express = require('express');
const router = express.Router();
const { 
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientsController');
const { authenticate, authorizeRole } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/clients - Get all clients
router.get('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getAllClients);

// GET /api/clients/:id - Get a specific client
router.get('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), getClientById);

// POST /api/clients - Create a new client
router.post('/', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), createClient);

// PUT /api/clients/:id - Update a client
router.put('/:id', authorizeRole(['ADMIN', 'SALES', 'BUSINESS_DEVELOPMENT_OFFICER']), updateClient);

// DELETE /api/clients/:id - Delete a client
router.delete('/:id', authorizeRole(['ADMIN']), deleteClient);

module.exports = router;