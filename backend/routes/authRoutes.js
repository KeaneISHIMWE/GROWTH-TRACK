const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/usersController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.post('/logout', authenticate, logoutUser);
router.get('/me', authenticate, getCurrentUser);

module.exports = router;