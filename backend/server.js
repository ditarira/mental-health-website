const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://mental-health-website-lyart.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'MindfulMe Backend API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    await prisma.\();
    res.json({ 
      status: 'healthy', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Import routes
const authRoutes = require('./src/routes/auth');
const journalRoutes = require('./src/routes/journal');
const breathingRoutes = require('./src/routes/breathing');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/breathing', breathingRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.\();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.\();
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(\🚀 Server running on port \\);
  console.log(\📍 Environment: \\);
  console.log(\🌐 CORS enabled for: \\);
});
