// routes/auth.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  register,
  login,
  verifyToken
} = require('../src/controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/verify', auth, verifyToken);

module.exports = router;
