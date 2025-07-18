// src/routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(adminOnly);

// Get dashboard stats
router.get('/stats', adminController.getDashboardStats);

// Get all users
router.get('/users', adminController.getAllUsers);

// Update user role
router.put('/users/:id/role', adminController.updateUserRole);

// Delete user
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
