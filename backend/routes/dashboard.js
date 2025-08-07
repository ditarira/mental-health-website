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
