// src/routes/resources.js
const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', resourceController.getResources);
router.get('/:id', resourceController.getResourceById);

// Admin only routes
router.post('/', authMiddleware, adminOnly, resourceController.createResource);
router.put('/:id', authMiddleware, adminOnly, resourceController.updateResource);
router.delete('/:id', authMiddleware, adminOnly, resourceController.deleteResource);

module.exports = router;
