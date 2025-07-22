// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import your existing routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const journalRoutes = require('./src/routes/journal');
const resourceRoutes = require('./src/routes/resources');
const breathingRoutes = require('./src/routes/breathing');
const adminRoutes = require('./src/routes/admin');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://mental-health-website-lyart.vercel.app'],
  credentials: true
}));
app.use(morgan('common'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Mental Health API is running!'
  });
});

// API Routes - THIS IS WHAT WAS MISSING!
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/breathing', breathingRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏥 Mental Health API ready!`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
