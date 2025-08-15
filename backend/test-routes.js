const express = require('express');
const app = express();

// Test if users routes load
try {
  const userRoutes = require('./src/routes/users');
  console.log('? Users routes loaded successfully');
  console.log('Available routes:');
  console.log('- GET /api/users/settings');
  console.log('- PUT /api/users/settings');
  console.log('- GET /api/users/profile');
} catch (error) {
  console.error('? Error loading users routes:', error.message);
  console.error('Full error:', error);
}
