const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Registration attempt received');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { email, password, firstName, lastName } = req.body;
    
    // Detailed validation
    if (!email) {
      console.log('❌ Missing email');
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    if (!password) {
      console.log('❌ Missing password');
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }
    
    if (!firstName) {
      console.log('❌ Missing firstName');
      return res.status(400).json({
        success: false,
        message: 'First name is required'
      });
    }
    
    if (!lastName) {
      console.log('❌ Missing lastName');
      return res.status(400).json({
        success: false,
        message: 'Last name is required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Password validation
    if (password.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    console.log('✅ All validation passed for:', email);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    console.log('✅ User does not exist, proceeding with creation');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('✅ Password hashed');
    
    // Determine role
    const role = email.toLowerCase() === 'admin@mindfulme.com' ? 'ADMIN' : 'USER';
    console.log('✅ Role determined:', role);
    
    // Create user
const user = await prisma.user.create({
  data: {
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    role,
    updatedAt: new Date() // ADD THIS LINE
  }
});
    console.log('✅ User created successfully:', user.email, 'ID:', user.id);

    // Generate token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-make-it-long-and-random-12345',
      { expiresIn: '7d' }
    );

    console.log('✅ Token generated for:', user.email);

    res.json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/auth/login  
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt received for:', req.body.email);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('✅ User found:', user.email, 'Role:', user.role);
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('✅ Password valid for:', email);
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-make-it-long-and-random-12345',
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful for:', email);

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

module.exports = router;
