// src/routes/breathing.js
const express = require('express');
const router = express.Router();
const breathingController = require('../controllers/breathingController');
const { authMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Get all breathing sessions
router.get('/', breathingController.getBreathingSessions);

// Create new breathing session
router.post('/', breathingController.createBreathingSession);

// Get breathing stats
router.get('/stats', breathingController.getBreathingStats);

module.exports = router;
