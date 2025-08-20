const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const verifyToken = require('../middleware/auth');

// Get dashboard statistics
router.get('/stats', verifyToken, async (req, res) => {
  try {
    // Get counts for user's activities
    const [journalCount, breathingCount] = await Promise.all([
      prisma.journalEntry?.count({ where: { userId: req.userId } }) || 0,
      prisma.breathingSession?.count({ where: { userId: req.userId } }) || 0
    ]);

    // Get recent activities
    const recentJournals = await prisma.journalEntry?.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        title: true,
        createdAt: true,
        mood: true
      }
    }) || [];

    const recentBreathing = await prisma.breathingSession?.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        duration: true,
        type: true,
        createdAt: true
      }
    }) || [];

    res.json({
      stats: {
        totalJournalEntries: journalCount,
        totalBreathingSessions: breathingCount,
        streakDays: 7, // Placeholder
        totalMinutesMeditated: breathingCount * 5 // Placeholder calculation
      },
      recentActivity: {
        journals: recentJournals,
        breathingSessions: recentBreathing
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    // Return default stats instead of error
    res.json({
      stats: {
        totalJournalEntries: 0,
        totalBreathingSessions: 0,
        streakDays: 0,
        totalMinutesMeditated: 0
      },
      recentActivity: {
        journals: [],
        breathingSessions: []
      }
    });
  }
});

module.exports = router;