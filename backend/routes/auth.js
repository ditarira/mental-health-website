const express = require('express');
const { register, login } = require('../controllers/authController');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Register route
router.post('/register', register);

// Login route  
router.post('/login', login);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

// Database test route
router.get('/db-test', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ 
      message: 'Database connection working!', 
      userCount: userCount 
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      details: error.message 
    });
  }
});

module.exports = router;
