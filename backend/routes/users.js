const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get current user profile
router.get('/profile', async (req, res) => {
  try {
    console.log('👤 Fetching profile for user:', req.user.email);
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        bio: true,
        createdAt: true,
        _count: {
          select: {
            journalEntries: true,
            breathingSessions: true
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ Profile retrieved');
    res.json(user);
    
  } catch (error) {
    console.error('❌ Profile fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user profile',
      details: error.message 
    });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    
    console.log('👤 Updating profile for user:', req.user.email);
    console.log('Update data:', { firstName, lastName, bio });
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName: firstName || req.user.firstName,
        lastName: lastName || req.user.lastName,
        bio: bio || ''
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        bio: true,
        createdAt: true
      }
    });
    
    console.log('✅ Profile updated successfully');
    res.json(user);
    
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ 
      error: 'Failed to update user profile',
      details: error.message 
    });
  }
});

// Change password
router.put('/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new passwords are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }
    
    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Verify current password
    const bcrypt = require('bcryptjs');
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    
    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword }
    });
    
    console.log('✅ Password updated for user:', user.email);
    res.json({ message: 'Password updated successfully' });
    
  } catch (error) {
    console.error('❌ Password update error:', error);
    res.status(500).json({ 
      error: 'Failed to update password',
      details: error.message 
    });
  }
});

module.exports = router;
