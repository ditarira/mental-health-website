const express = require('express');
const { getAdminStats, getAdminUsers } = require('../controllers/dashboardController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Admin dashboard stats
router.get('/stats', adminAuth, getAdminStats);

// Get all users for admin
router.get('/users', adminAuth, getAdminUsers);

module.exports = router;
