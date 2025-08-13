const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalJournalEntries = await prisma.journalEntry.count();
    const totalBreathingSessions = await prisma.breathingSession.count();

    const stats = {
      totalUsers,
      totalJournalEntries,
      totalBreathingSessions,
      activeUsers: 0,
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: stats,
      message: 'Admin statistics retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics',
      error: error.message
    });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

module.exports = router;