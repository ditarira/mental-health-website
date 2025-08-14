const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'https://mental-health-website-lyart.vercel.app',
    'https://mental-health-website-3tosql533-dita-riras-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'MindfulMe API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Load routes one by one to identify the problem
console.log('Loading routes...');

try {
  console.log('1. Loading auth routes...');
  const authRoutes = require('./src/routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('? Auth routes loaded successfully');
} catch (error) {
  console.error('? Auth routes error:', error.message);
}

try {
  console.log('2. Loading admin routes...');
  const adminRoutes = require('./src/routes/admin');
  app.use('/api/admin', adminRoutes);
  console.log('? Admin routes loaded successfully');
} catch (error) {
  console.error('? Admin routes error:', error.message);
}

try {
  console.log('3. Loading journal routes...');
  const journalRoutes = require('./src/routes/journal');
  app.use('/api/journal', journalRoutes);
  console.log('? Journal routes loaded successfully');
} catch (error) {
  console.error('? Journal routes error:', error.message);
}

try {
  console.log('4. Loading breathing routes...');
  const breathingRoutes = require('./src/routes/breathing');
  app.use('/api/breathing', breathingRoutes);
  console.log('? Breathing routes loaded successfully');

  } catch (error) {
    console.error('? Error loading breathing routes:', error);
  }

  try {
    console.log('5. Loading dashboard routes...');
    const dashboardRoutes = require('./src/routes/dashboard');
    app.use('/api/dashboard', dashboardRoutes);
    console.log('? Dashboard routes loaded successfully');
} catch (error) {
  console.error('? Breathing routes error:', error.message);
}

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('?? Server running on port', PORT);
  console.log('?? Test: http://localhost:' + PORT + '/api/health');
});
