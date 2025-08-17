const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    console.log('?? Getting profile for user:', req.user.id);
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        phone: true,
        location: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user
    });

  } catch (error) {
    console.error('? Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
      details: error.message
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    console.log('?? Updating profile for user:', req.user.id);
    
    const { firstName, lastName, email, bio, phone, location } = req.body;
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        email: email?.toLowerCase().trim(),
        bio: bio?.trim(),
        phone: phone?.trim(),
        location: location?.trim(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        bio: true,
        phone: true,
        location: true,
        role: true,
        createdAt: true
      }
    });

    console.log('? Profile updated successfully');

    res.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error('? Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
      details: error.message
    });
  }
};

// Get user settings
const getUserSettings = async (req, res) => {
  try {
    console.log('?? Getting settings for user:', req.user.id);
    
    // For now, return default settings since we don't have a Settings table
    // You can extend this to use the user's preferences JSON field
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { preferences: true }
    });

    const defaultSettings = {
      fontSize: 'medium',
      colorScheme: 'purple',
      notifications: true,
      privacy: 'private'
    };

    const settings = user?.preferences || defaultSettings;

    res.json({
      success: true,
      settings: settings
    });

  } catch (error) {
    console.error('? Get settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch settings',
      details: error.message
    });
  }
};

// Update user settings
const updateUserSettings = async (req, res) => {
  try {
    console.log('?? Updating settings for user:', req.user.id);
    
    const settings = req.body;
    const userId = req.user.id;

    await prisma.user.update({
      where: { id: userId },
      data: {
        preferences: settings,
        updatedAt: new Date()
      }
    });

    console.log('? Settings updated successfully');

    res.json({
      success: true,
      settings: settings
    });

  } catch (error) {
    console.error('? Update settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update settings',
      details: error.message
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    console.log('?? Password change request for user:', req.user.id);
    
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'New password must be at least 6 characters long'
      });
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updatedAt: new Date()
      }
    });

    console.log('? Password changed successfully');

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('? Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to change password',
      details: error.message
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserSettings,
  updateUserSettings,
  changePassword
};
