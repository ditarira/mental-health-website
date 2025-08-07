const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get user settings
const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    const settings = {
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio || '',
        avatar: user.avatar || null
      },
      security: {
        twoFactorEnabled: user.twoFactorEnabled || false
      },
      notifications: {
        emailNotifications: user.emailNotifications !== false,
        pushNotifications: user.pushNotifications !== false,
        journalReminders: user.journalReminders !== false,
        breathingReminders: user.breathingReminders !== false,
        weeklyReports: user.weeklyReports !== false,
        reminderTime: user.reminderTime || '09:00'
      },
      appearance: {
        theme: user.theme || 'light',
        fontSize: user.fontSize || 'medium',
        colorScheme: user.colorScheme || 'default'
      },
      privacy: {
        dataSharing: user.dataSharing || false,
        analytics: user.analytics !== false,
        marketing: user.marketing || false
      }
    };

    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update profile settings
const updateProfileSettings = async (req, res) => {
  try {
    const { firstName, lastName, email, bio } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if email is already in use by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.bio = bio;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update security settings
const updateSecuritySettings = async (req, res) => {
  try {
    const { twoFactorEnabled } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.twoFactorEnabled = twoFactorEnabled;
    await user.save();

    res.json({ message: 'Security settings updated successfully' });
  } catch (error) {
    console.error('Error updating security settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update notification settings
const updateNotificationSettings = async (req, res) => {
  try {
    const {
      emailNotifications,
      pushNotifications,
      journalReminders,
      breathingReminders,
      weeklyReports,
      reminderTime
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.emailNotifications = emailNotifications;
    user.pushNotifications = pushNotifications;
    user.journalReminders = journalReminders;
    user.breathingReminders = breathingReminders;
    user.weeklyReports = weeklyReports;
    user.reminderTime = reminderTime;

    await user.save();

    res.json({ message: 'Notification settings updated successfully' });
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update appearance settings
const updateAppearanceSettings = async (req, res) => {
  try {
    const { theme, fontSize, colorScheme } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.theme = theme;
    user.fontSize = fontSize;
    user.colorScheme = colorScheme;

    await user.save();

    res.json({ message: 'Appearance settings updated successfully' });
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update privacy settings
const updatePrivacySettings = async (req, res) => {
  try {
    const { dataSharing, analytics, marketing } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.dataSharing = dataSharing;
    user.analytics = analytics;
    user.marketing = marketing;

    await user.save();

    res.json({ message: 'Privacy settings updated successfully' });
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Export user data
const exportUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    // Get all user data (journals, mood entries, etc.)
    const userData = {
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        createdAt: user.createdAt
      },
      settings: {
        notifications: {
          emailNotifications: user.emailNotifications,
          pushNotifications: user.pushNotifications,
          journalReminders: user.journalReminders,
          breathingReminders: user.breathingReminders,
          weeklyReports: user.weeklyReports,
          reminderTime: user.reminderTime
        },
        appearance: {
          theme: user.theme,
          fontSize: user.fontSize,
          colorScheme: user.colorScheme
        },
        privacy: {
          dataSharing: user.dataSharing,
          analytics: user.analytics,
          marketing: user.marketing
        }
      }
      // Add journals, mood entries, etc. here when you have those models
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=mindfulme-data-export.json');
    res.json(userData);
  } catch (error) {
    console.error('Error exporting user data:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
  try {
    // Delete all user data (journals, mood entries, etc.)
    // You'll need to add this when you have those models
    
    await User.findByIdAndDelete(req.user.id);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getSettings,
  updateProfileSettings,
  updateSecuritySettings,
  updateNotificationSettings,
  updateAppearanceSettings,
  updatePrivacySettings,
  changePassword,
  exportUserData,
  deleteUserAccount
};
