// src/routes/achievements.js
const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware);

router.get('/:userId', achievementController.getUserAchievements);
router.post('/unlock', achievementController.unlockAchievements);

module.exports = router;
