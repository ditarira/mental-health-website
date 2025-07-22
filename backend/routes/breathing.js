// backend/routes/breathing.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// POST /api/breathing/sessions - Create a new breathing session
router.post('/sessions', authenticateToken, async (req, res) => {
  try {
    const { technique, duration, targetDuration, completed, cyclesCompleted, targetCycles } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!technique || duration === undefined) {
      return res.status(400).json({ 
        error: 'Technique and duration are required' 
      });
    }

    // Create breathing session record
    const breathingSession = await req.prisma.breathingSession.create({
      data: {
        userId: userId,
        technique: technique,
        duration: parseInt(duration),
        targetDuration: parseInt(targetDuration) || parseInt(duration),
        completed: completed !== false, // Default to true to match your existing schema
        cyclesCompleted: parseInt(cyclesCompleted) || 0,
        targetCycles: parseInt(targetCycles) || 1
      }
    });

    // Update user's breathing session count (for admin dashboard)
    await req.prisma.user.update({
      where: { id: userId },
      data: { updatedAt: new Date() }
    });

    res.status(201).json({
      message: 'Breathing session saved successfully',
      session: breathingSession
    });

  } catch (error) {
    console.error('Error saving breathing session:', error);
    res.status(500).json({ 
      error: 'Failed to save breathing session',
      details: error.message 
    });
  }
});

// GET /api/breathing/sessions - Get user's breathing sessions
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10, page = 1 } = req.query;

    const sessions = await req.prisma.breathingSession.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    });

    const totalSessions = await req.prisma.breathingSession.count({
      where: { userId: userId }
    });

    res.json({
      sessions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalSessions / parseInt(limit)),
        totalSessions
      }
    });

  } catch (error) {
    console.error('Error fetching breathing sessions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch breathing sessions',
      details: error.message 
    });
  }
});

// GET /api/breathing/stats - Get user's breathing statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { days = 30 } = req.query;
    
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - parseInt(days));

    // Get session stats
    const sessions = await req.prisma.breathingSession.findMany({
      where: {
        userId: userId,
        createdAt: { gte: dateFrom }
      }
    });

    // Calculate statistics
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.completed).length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const averageDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;

    // Get technique distribution
    const techniqueStats = sessions.reduce((acc, session) => {
      acc[session.technique] = (acc[session.technique] || 0) + 1;
      return acc;
    }, {});

    // Get recent streak
    const recentSessions = await req.prisma.breathingSession.findMany({
      where: { 
        userId: userId,
        completed: true 
      },
      orderBy: { createdAt: 'desc' },
      take: 30
    });

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(checkDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const hasSession = recentSessions.some(session => {
        const sessionDate = new Date(session.createdAt);
        return sessionDate >= checkDate && sessionDate < nextDay;
      });
      
      if (hasSession) {
        currentStreak++;
      } else {
        break;
      }
    }

    res.json({
      totalSessions,
      completedSessions,
      totalDuration,
      averageDuration,
      currentStreak,
      completionRate: totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0,
      techniqueStats,
      period: `${days} days`
    });

  } catch (error) {
    console.error('Error fetching breathing stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch breathing statistics',
      details: error.message 
    });
  }
});

module.exports = router;