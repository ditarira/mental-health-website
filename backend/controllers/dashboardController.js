const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get personal stats for user dashboard
const getPersonalStats = async (req, res) => {
  try {
    console.log('?? Getting personal stats for user:', req.user.id);
    
    const userId = req.user.id;

    // Get journal entries count and recent entries
    const journalEntries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    const totalJournalEntries = await prisma.journalEntry.count({
      where: { userId }
    });

    // Get breathing sessions count and recent sessions
    const breathingSessions = await prisma.breathingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    const totalBreathingSessions = await prisma.breathingSession.count({
      where: { userId }
    });

    // Calculate current streak (simplified - consecutive days with activity)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentStreak = 0;
    let checkDate = new Date(today);
    
    for (let i = 0; i < 30; i++) { // Check last 30 days max
      const dayStart = new Date(checkDate);
      const dayEnd = new Date(checkDate);
      dayEnd.setHours(23, 59, 59, 999);
      
      const hasActivity = await prisma.journalEntry.count({
        where: {
          userId,
          createdAt: {
            gte: dayStart,
            lte: dayEnd
          }
        }
      }) > 0 || await prisma.breathingSession.count({
        where: {
          userId,
          createdAt: {
            gte: dayStart,
            lte: dayEnd
          }
        }
      }) > 0;
      
      if (hasActivity) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Find favorite breathing exercise
    const breathingTypes = await prisma.breathingSession.groupBy({
      by: ['type'],
      where: { userId },
      _count: { type: true },
      orderBy: { _count: { type: 'desc' } },
      take: 1
    });

    const favoriteExercise = breathingTypes.length > 0 ? breathingTypes[0].type : null;

    const stats = {
      totalJournalEntries,
      totalBreathingSessions,
      recentEntries: journalEntries.map(entry => ({
        id: entry.id,
        title: entry.title,
        mood: entry.mood,
        createdAt: entry.createdAt
      })),
      recentSessions: breathingSessions.map(session => ({
        id: session.id,
        type: session.type,
        duration: session.duration,
        createdAt: session.createdAt
      })),
      currentStreak,
      favoriteExercise
    };

    console.log('? Personal stats retrieved successfully');

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('? Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch personal stats',
      error: error.message
    });
  }
};

// Get admin stats
const getAdminStats = async (req, res) => {
  try {
    console.log('?? Getting admin stats');

    const totalUsers = await prisma.user.count();
    const totalJournalEntries = await prisma.journalEntry.count();
    const totalBreathingSessions = await prisma.breathingSession.count();
    
    // Get active users (users with activity in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const activeUserIds = await prisma.user.findMany({
      where: {
        OR: [
          {
            journal_entries: {
              some: {
                createdAt: { gte: sevenDaysAgo }
              }
            }
          },
          {
            breathing_sessions: {
              some: {
                createdAt: { gte: sevenDaysAgo }
              }
            }
          }
        ]
      },
      select: { id: true }
    });

    const activeUsers = activeUserIds.length;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalJournalEntries,
        totalBreathingSessions,
        activeUsers
      }
    });

  } catch (error) {
    console.error('? Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin stats',
      error: error.message
    });
  }
};

// Get all users for admin
const getAdminUsers = async (req, res) => {
  try {
    console.log('?? Getting all users for admin');

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
            journal_entries: true,
            breathing_sessions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const usersWithStats = users.map(user => ({
      ...user,
      journalEntries: user._count.journal_entries,
      breathingSessions: user._count.breathing_sessions,
      activityLevel: (user._count.journal_entries + user._count.breathing_sessions) > 5 ? 'Active' : 'Low'
    }));

    res.json({
      success: true,
      data: usersWithStats
    });

  } catch (error) {
    console.error('? Admin users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

module.exports = {
  getPersonalStats,
  getAdminStats,
  getAdminUsers
};
