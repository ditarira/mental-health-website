const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
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

app.use('/api/auth', require('./routes/auth'));
console.log('✅ Auth routes loaded');

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'MindfulMe Backend API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check with more details
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    database: 'connected',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Mock successful login for now
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: email
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    res.json({
      success: true,
      user: mockUser,
      token: mockToken,
      message: 'Login successful'
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log('Registration attempt for:', email);
    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Mock successful registration
    const mockUser = {
      id: 1,
      name: name,
      email: email
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    res.json({
      success: true,
      user: mockUser,
      token: mockToken,
      message: 'Registration successful'
    });
    
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
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 MindfulMe Backend Server running on port ' + PORT);
  console.log('📍 Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log('🌐 CORS enabled for Vercel frontend');
  console.log('✅ Server ready to accept connections');
});

// Import your auth middleware
const authMiddleware = require('./middleware/auth');

// Admin routes - use your authMiddleware
app.use('/api/admin', authMiddleware, require('./routes/admin'));

// Test route
app.get('/api/test-admin', authMiddleware, (req, res) => {
  res.json({
    message: 'Test endpoint working',
    user: req.user,
    isAdmin: req.user?.role === 'ADMIN',
    timestamp: new Date()
  });
});


// Admin routes - self-contained


// Enhanced API routes
app.use('/api/journal', require('./routes/journal'));
app.use('/api/breathing', require('./routes/breathing'));
app.use('/api/users', require('./routes/users'));

console.log('✅ Enhanced API routes loaded');

// Import auth middleware

// API Routes
app.use('/api/journal', require('./routes/journal'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Test endpoints
app.get('/api/test-auth', authMiddleware, (req, res) => {
  res.json({
    message: 'Authentication working',
    user: req.user,
    timestamp: new Date()
  });
});

console.log('✅ All API routes loaded successfully');

// Test auth endpoint to verify tokens and get user data
app.get('/api/test-auth', authMiddleware, (req, res) => {
  console.log('🔍 Test auth for user:', req.user?.email);
  
  res.json({
    message: 'Authentication successful',
    user: {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
      createdAt: req.user.createdAt
    },
    timestamp: new Date(),
    success: true
  });
});

console.log('✅ Test auth endpoint added');


