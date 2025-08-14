const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Apply auth middleware to all dashboard routes
router.use(auth);

// Personal dashboard stats endpoint
router.get('/personal-stats', async (req, res) => {
  try {
    console.log('📊 Fetching personal stats for user:', req.user.email);

    const userId = req.user.id;

    // Get user's journal entries count
    const journalEntriesCount = await prisma.journalEntry.count({
      where: { userId: userId }
    });

    // Get user's breathing sessions count  
    const breathingSessionsCount = await prisma.breathingSession.count({
      where: { userId: userId }
    });

    // Get recent entries (last 5)
    const recentEntries = await prisma.journalEntry.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        mood: true,
        content: true,
        createdAt: true
      }
    });

    // Get recent breathing sessions (last 5)
    const recentSessions = await prisma.breathingSession.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        type: true,
        duration: true,
        completed: true,
        createdAt: true
      }
    });

    // Calculate streak (days with activity)
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dayStart = new Date(checkDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(checkDate);
      dayEnd.setHours(23, 59, 59, 999);

      const hasJournalActivity = await prisma.journalEntry.count({
        where: {
          userId: userId,
          createdAt: {
            gte: dayStart,
            lte: dayEnd
          }
        }
      });

      const hasBreathingActivity = await prisma.breathingSession.count({
        where: {
          userId: userId,
          createdAt: {
            gte: dayStart,
            lte: dayEnd
          }
        }
      });

      const hasActivity = hasJournalActivity > 0 || hasBreathingActivity > 0;

      if (hasActivity) {
        if (i === 0 || streak === i) {
          streak++;
        } else {
          break;
        }
      } else if (i === 0) {
        break;
      }
    }

    // Find favorite breathing exercise
    const breathingTypes = await prisma.breathingSession.groupBy({
      by: ['type'],
      where: { userId: userId },
      _count: { type: true },
      orderBy: { _count: { type: 'desc' } }
    });

    const favoriteExercise = breathingTypes.length > 0 ? breathingTypes[0].type : null;

    const personalStats = {
      totalJournalEntries: journalEntriesCount,
      totalBreathingSessions: breathingSessionsCount,
      recentEntries,
      recentSessions,
      currentStreak: streak,
      favoriteExercise
    };

    console.log('✅ Personal stats for', req.user.email, ':', personalStats);
    res.json({
      success: true,
      data: personalStats
    });

  } catch (error) {
    console.error('❌ Personal stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch personal statistics',
      details: error.message
    });
  }
});

module.exports = router;
