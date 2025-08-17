const express = require('express');
const { 
  getUserProfile, 
  updateUserProfile, 
  getUserSettings, 
  updateUserSettings, 
  changePassword 
} = require('../controllers/usersController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.put('/profile', auth, updateUserProfile);

// Get user settings
router.get('/settings', auth, getUserSettings);

// Update user settings
router.put('/settings', auth, updateUserSettings);

// Change password
router.put('/change-password', auth, changePassword);

module.exports = router;
