const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Registration attempt received');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
   
    const { email, password, firstName, lastName } = req.body;

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    if (password.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    console.log('✅ All validation passed for:', email);

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

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('✅ Password hashed');

    const role = email.toLowerCase() === 'admin@mindfulme.com' ? 'ADMIN' : 'USER';
    console.log('✅ Role determined:', role);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role,
        updatedAt: new Date()
      }
    });
    console.log('✅ User created successfully:', user.email, 'ID:', user.id);

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('✅ Password valid for:', email);

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

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    console.log('🔑 Password reset attempt received');
    console.log('Request body:', req.body);

    const { token, newPassword, email } = req.body;

    if (!token || !newPassword || !email) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Token, email, and new password are required'
      });
    }

    if (newPassword.length < 6) {
      console.log('❌ Password too short');
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    console.log('🔍 Looking for user with email:', email);

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('✅ User found:', user.email);

    if (token.length !== 6 || !/^\d{6}$/.test(token)) {
      console.log('❌ Invalid token format:', token);
      return res.status(400).json({
        success: false,
        message: 'Invalid reset code format'
      });
    }

    console.log('✅ Token format valid, proceeding with password reset');

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log('✅ Password hashed');

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        updatedAt: new Date()
      }
    });

    console.log('✅ Password reset successful for:', user.email);

    res.json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;