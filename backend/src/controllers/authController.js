// src/controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-super-secret-jwt-key-make-it-long-and-random-12345', {
    expiresIn: '7d',
  });
};

// Register new user
const register = async (req, res) => {
  try {
    console.log('📝 Registration attempt:', { ...req.body, password: '[HIDDEN]' });
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    if (password.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: email.toLowerCase() === 'admin@mindfulme.com' ? 'ADMIN' : 'USER'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    // Generate token
    const token = generateToken(user.id);

    console.log('✅ User registered successfully:', user.email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
      token
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register user. Please try again.'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    console.log('🔐 Login attempt for:', req.body.email);
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() }
    });

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    console.log('✅ Login successful for:', user.email);

    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to login. Please try again.'
    });
  }
};

// Verify token
const verifyToken = async (req, res) => {
  try {
    console.log('🔍 Verifying token for user ID:', req.userId);
    
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      console.log('❌ User not found during token verification');
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    console.log('✅ Token verified for user:', user.email);

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('❌ Token verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify token'
    });
  }
};

module.exports = {
  register,
  login,
  verifyToken
};
