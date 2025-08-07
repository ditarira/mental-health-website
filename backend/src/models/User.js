const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  
  // Profile Settings
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: null
  },
  
  // Security Settings
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  
  // Notification Settings
  emailNotifications: {
    type: Boolean,
    default: true
  },
  pushNotifications: {
    type: Boolean,
    default: true
  },
  journalReminders: {
    type: Boolean,
    default: true
  },
  breathingReminders: {
    type: Boolean,
    default: true
  },
  weeklyReports: {
    type: Boolean,
    default: true
  },
  reminderTime: {
    type: String,
    default: '09:00'
  },
  
  // Appearance Settings
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  },
  fontSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },
  colorScheme: {
    type: String,
    enum: ['default', 'ocean', 'forest', 'sunset', 'lavender'],
    default: 'default'
  },
  
  // Privacy Settings
  dataSharing: {
    type: Boolean,
    default: false
  },
  analytics: {
    type: Boolean,
    default: true
  },
  marketing: {
    type: Boolean,
    default: false
  },
  
  // Account Info
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);
