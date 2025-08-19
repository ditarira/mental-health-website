const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// CORS Configuration - Allow your frontend domain
app.use(cors({
  origin: [
    'https://mental-health-website-lyart.vercel.app',
    'http://localhost:3000',
    'https://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
  next();
});

// Import routes
const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const breathingRoutes = require('./routes/breathing');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');
const resourceRoutes = require('./routes/resources');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/breathing', breathingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MindfulMe Backend is running!',
    timestamp: new Date().toISOString(),
    database: 'NeonDB PostgreSQL',
    orm: 'Prisma',
    cors: 'Enabled for frontend'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`? Server running on port ${PORT}`);
  console.log(`? CORS enabled for: https://mental-health-website-lyart.vercel.app`);
  console.log(`? Database: ${process.env.DATABASE_URL ? 'Connected' : 'URL Missing'}`);
});

module.exports = app;
