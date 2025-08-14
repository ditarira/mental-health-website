const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get user dashboard data
router.get('/', async (req, res) => {
  try {
    console.log('📊 Fetching dashboard data for user:', req.user.email);
    
    const userId = req.user.id;
    
    // Get basic counts
    const journalCount = await prisma.journalEntry.count({
      where: { userId }
    });
    
    const breathingCount = await prisma.breathingSession.count({
      where: { userId }
    });
    
    // Get total breathing duration
    const breathingDuration = await prisma.breathingSession.aggregate({
      where: { userId },
      _sum: { duration: true }
    });
    
    // Simple streak calculation (days with activity)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyJournals = await prisma.journalEntry.count({
      where: {
        userId,
        createdAt: { gte: oneWeekAgo }
      }
    });
    
    const weeklySessions = await prisma.breathingSession.count({
      where: {
        userId,
        createdAt: { gte: oneWeekAgo }
      }
    });
    
    // Get recent activities
    const recentJournals = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        mood: true,
        createdAt: true
      }
    });
    
    const recentSessions = await prisma.breathingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        type: true,
        duration: true,
        createdAt: true
      }
    });
    
    const dashboardData = {
      user: {
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email,
        memberSince: req.user.createdAt || new Date()
      },
      stats: {
        totalJournalEntries: journalCount,
        totalBreathingSessions: breathingCount,
        totalBreathingMinutes: Math.round((breathingDuration._sum.duration || 0) / 60),
        currentStreak: weeklyJournals + weeklySessions > 0 ? 1 : 0,
        longestStreak: weeklyJournals + weeklySessions > 0 ? 1 : 0,
        weeklyActivity: weeklyJournals + weeklySessions,
        averageMood: 3
      },
      trends: {
        weeklyJournals,
        weeklySessions
      },
      recentActivity: {
        journals: recentJournals,
        sessions: recentSessions
      },
      success: true
    };
    
    console.log('✅ Dashboard data computed for:', req.user.email);
    res.json(dashboardData);
    
  } catch (error) {
    console.error('❌ Dashboard error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard data',
      details: error.message,
      success: false
    });
  }
});

// Get user statistics
router.get('/stats', async (req, res) => {
  try {
    console.log('📈 Fetching user stats for:', req.user.email);
    
    const userId = req.user.id;
    
    // Get mood distribution from journal entries
    const moodStats = await prisma.journalEntry.groupBy({
      by: ['mood'],
      where: { userId },
      _count: { mood: true }
    });
    
    // Get breathing session types
    const breathingStats = await prisma.breathingSession.groupBy({
      by: ['type'],
      where: { userId },
      _count: { type: true }
    });
    
    // Get activity over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyActivity = await prisma.journalEntry.findMany({
      where: {
        userId,
        createdAt: { gte: thirtyDaysAgo }
      },
      select: {
        createdAt: true
      }
    });
    
    const stats = {
      moodDistribution: moodStats,
      breathingTypes: breathingStats,
      dailyActivity: dailyActivity,
      success: true
    };
    
    console.log('✅ User stats computed');
    res.json(stats);
    
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch user statistics',
      details: error.message,
      success: false
    });
  }
});

module.exports = router;
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
