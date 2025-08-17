const express = require('express');
const { 
  getBreathingSessions, 
  createBreathingSession, 
  getBreathingStats,
  updateBreathingSession,
  deleteBreathingSession
} = require('../controllers/breathingController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all breathing sessions for user
router.get('/', auth, getBreathingSessions);

// Create new breathing session
router.post('/', auth, createBreathingSession);

// Get breathing statistics
router.get('/stats', auth, getBreathingStats);

// Update breathing session
router.put('/:id', auth, updateBreathingSession);

// Delete breathing session
router.delete('/:id', auth, deleteBreathingSession);

module.exports = router;
