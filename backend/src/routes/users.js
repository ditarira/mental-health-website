const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

// Check if auth middleware exists, if not create a simple one
let authMiddleware;
try {
  const authModule = require('../middleware/auth');
  authMiddleware = authModule.authMiddleware || authModule;
} catch (error) {
  // Simple auth middleware if the file doesn't exist
  authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

const prisma = new PrismaClient();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    });
    res.json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Get user settings
router.get('/settings', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        preferences: true
      }
    });
    
    const defaultSettings = {
      fontSize: 'medium',
      colorScheme: 'purple'
    };
    
    res.json({ 
      settings: user?.preferences || defaultSettings 
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

// Update user settings
router.put('/settings', authMiddleware, async (req, res) => {
  try {
    const { fontSize, colorScheme } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        preferences: {
          fontSize: fontSize || 'medium',
          colorScheme: colorScheme || 'purple'
        }
      },
      select: {
        preferences: true
      }
    });
    
    res.json({ 
      message: 'Settings updated successfully',
      settings: user.preferences 
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
