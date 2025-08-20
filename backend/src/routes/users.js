const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');  // ADD THIS MISSING IMPORT
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Import the correct auth middleware
const verifyToken = require('../middleware/auth');

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },  // Use req.userId consistently
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, email, bio } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        firstName,
        lastName,
        email,
        bio
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        role: true,
        createdAt: true
      }
    });
    
    res.json({ 
      message: 'Profile updated successfully',
      user 
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user settings
router.get('/settings', verifyToken, async (req, res) => {
  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId: req.userId }
    });

    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = await prisma.userSettings.create({
        data: {
          userId: req.userId,
          fontSize: 'medium',
          fontWeight: 'normal'
        }
      });
      return res.json({ settings: defaultSettings });
    }

    res.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update user settings
router.put('/settings', verifyToken, async (req, res) => {
  try {
    const { fontSize, fontWeight } = req.body;

    const settings = await prisma.userSettings.upsert({
      where: { userId: req.userId },
      update: {
        fontSize,
        fontWeight
      },
      create: {
        userId: req.userId,
        fontSize,
        fontWeight
      }
    });

    res.json({ settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Change password
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    console.log('🔐 Password change request for user:', req.userId);
    console.log('🔐 Current password provided:', currentPassword ? 'Yes' : 'No');
    console.log('🔐 New password provided:', newPassword ? 'Yes' : 'No');

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    // Get user with current password
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      console.log('🔐 User not found:', req.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('🔐 User found, email:', user.email);
    console.log('🔐 Stored password hash exists:', !!user.password);

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    console.log('🔐 Password comparison result:', isValidPassword);

    if (!isValidPassword) {
      console.log('🔐 Password verification failed for user:', user.email);
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    console.log('🔐 New password hashed successfully');

    // Update password
    await prisma.user.update({
      where: { id: req.userId },
      data: { password: hashedNewPassword }
    });

    console.log('🔐 Password updated successfully for user:', user.email);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('🔐 Password change error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router;