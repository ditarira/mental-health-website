const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

// CORS configuration
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

// Database health check
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$connect();
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

// Basic auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // For now, create a mock successful login
    // TODO: Implement real authentication
    if (email && password) {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: email
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      res.json({
        success: true,
        user: mockUser,
        token: mockToken
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // For now, create a mock successful registration
    // TODO: Implement real user creation
    if (name && email && password) {
      const mockUser = {
        id: 1,
        name: name,
        email: email
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      res.json({
        success: true,
        user: mockUser,
        token: mockToken
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Mock user profile endpoint
app.get('/api/auth/me', (req, res) => {
  // For now, return a mock user
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com'
  };
  
  res.json(mockUser);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    message: 'Internal server error'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(🚀 Server running on port );
  console.log(🌐 Environment: );
});
