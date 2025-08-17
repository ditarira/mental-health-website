const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'mindfulme-secret-key-2024';

// Register user
const register = async (req, res) => {
  try {
    console.log('?? Registration attempt for:', req.body.email);
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with proper data
    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        updatedAt: new Date()
      }
    });

    console.log('? User created successfully:', user.id);

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (error) {
    console.error('? Registration error:', error);
    console.error('? Error details:', error.message);
    console.error('? Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Server error during registration',
      details: error.message 
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    console.log('?? Login attempt for:', req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log('?? Looking for user in database...');
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    console.log('?? User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('? User not found:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('?? Checking password...');
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    console.log('?? Password match:', isMatch);

    if (!isMatch) {
      console.log('? Invalid password for:', email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('? Login successful for:', email);

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('? Login error:', error);
    console.error('? Error message:', error.message);
    console.error('? Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Server error during login',
      details: error.message 
    });
  }
};

module.exports = {
  register,
  login
};
