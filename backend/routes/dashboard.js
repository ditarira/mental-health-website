const express = require('express');
const { getPersonalStats } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

const router = express.Router();

// Personal stats for user dashboard
router.get('/personal-stats', auth, getPersonalStats);

module.exports = router;
