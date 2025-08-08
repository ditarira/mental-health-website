const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const resourceController = require('../controllers/resourceController');

// @route   GET /api/resources
// @desc    Get all resources
// @access  Public
router.get('/', resourceController.getAllResources);

// @route   GET /api/resources/stats
// @desc    Get resource statistics
// @access  Public
router.get('/stats', resourceController.getStats);

// @route   GET /api/resources/seed
// @desc    Seed initial resources (admin function)
// @access  Public (should be protected in production)
router.get('/seed', resourceController.seedResources);

// @route   POST /api/resources/favorites
// @desc    Save user favorites
// @access  Private
router.post('/favorites', auth, resourceController.saveFavorites);

// @route   GET /api/resources/favorites/user
// @desc    Get user favorites
// @access  Private
router.get('/favorites/user', auth, resourceController.getUserFavorites);

// @route   GET /api/resources/:id
// @desc    Get single resource (put this LAST to avoid conflicts)
// @access  Public
router.get('/:id', resourceController.getResource);

module.exports = router;
