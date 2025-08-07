const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Admin middleware - check if user is admin
const adminMiddleware = (req, res, next) => {
  try {
    console.log('🔍 Admin check for user:', req.user?.email);
    
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Check if user is admin by role or email
    const isAdmin = req.user.role === 'ADMIN' || req.user.email === 'admin@mindfulme.com';
    
    if (!isAdmin) {
      console.log('❌ Admin access denied for:', req.user.email);
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    console.log('✅ Admin access granted for:', req.user.email);
    next();
  } catch (error) {
    console.error('❌ Admin middleware error:', error);
    res.status(500).json({ error: 'Admin verification failed' });
  }
};

// Get admin statistics
router.get('/stats', adminMiddleware, async (req, res) => {
  try {
    console.log('📊 Fetching admin stats...');
    
    // Get total users count
    const totalUsers = await prisma.user.count();
    
    // Get active users (users with activity in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await prisma.user.count({
      where: {
        OR: [
          {
            journalEntries: {
              some: {
                createdAt: { gte: thirtyDaysAgo }
              }
            }
          },
          {
            breathingSessions: {
              some: {
                createdAt: { gte: thirtyDaysAgo }
              }
            }
          }
        ]
      }
    });
    
    // Get total journal entries
    const journalEntries = await prisma.journalEntry.count();
    
    // Get total breathing sessions
    const breathingSessions = await prisma.breathingSession.count();
    
    const stats = {
      totalUsers,
      activeUsers,
      journalEntries,
      breathingSessions
    };
    
    console.log('✅ Admin stats computed:', stats);
    res.json(stats);
    
  } catch (error) {
    console.error('❌ Admin stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch admin statistics',
      details: error.message 
    });
  }
});

// Get all users with their activity counts
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    console.log('👥 Fetching all users for admin...');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            journalEntries: true,
            breathingSessions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log('✅ Found', users.length, 'users');
    res.json({ users, count: users.length });
    
  } catch (error) {
    console.error('❌ Admin users fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      details: error.message 
    });
  }
});

// Get detailed user information
router.get('/users/:userId', adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('🔍 Fetching detailed user info for:', userId);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        journalEntries: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            title: true,
            mood: true,
            createdAt: true
          }
        },
        breathingSessions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            type: true,
            duration: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            journalEntries: true,
            breathingSessions: true
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ User details fetched for:', user.email);
    res.json(user);
    
  } catch (error) {
    console.error('❌ User details fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user details',
      details: error.message 
    });
  }
});

module.exports = router;
