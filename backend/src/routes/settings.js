const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getSettings,
  updateProfileSettings,
  updateSecuritySettings,
  updateNotificationSettings,
  updateAppearanceSettings,
  updatePrivacySettings,
  changePassword,
  exportUserData,
  deleteUserAccount
} = require('../controllers/settingsController');

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', auth, getSettings);

// @route   PUT /api/settings/profile
// @desc    Update profile settings
// @access  Private
router.put('/profile', auth, updateProfileSettings);

// @route   PUT /api/settings/security
// @desc    Update security settings
// @access  Private
router.put('/security', auth, updateSecuritySettings);

// @route   PUT /api/settings/notifications
// @desc    Update notification settings
// @access  Private
router.put('/notifications', auth, updateNotificationSettings);

// @route   PUT /api/settings/appearance
// @desc    Update appearance settings
// @access  Private
router.put('/appearance', auth, updateAppearanceSettings);

// @route   PUT /api/settings/privacy
// @desc    Update privacy settings
// @access  Private
router.put('/privacy', auth, updatePrivacySettings);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/auth/change-password', auth, changePassword);

// @route   GET /api/user/export-data
// @desc    Export user data
// @access  Private
router.get('/user/export-data', auth, exportUserData);

// @route   DELETE /api/user/delete-account
// @desc    Delete user account
// @access  Private
router.delete('/user/delete-account', auth, deleteUserAccount);

module.exports = router;
