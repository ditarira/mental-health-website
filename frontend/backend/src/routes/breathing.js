// backend/routes/breathing.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Save breathing session
router.post('/session', authenticateToken, async (req, res) => {
  try {
    const { 
      technique, 
      duration, 
      cycles_completed, 
      mood_before, 
      mood_after 
    } = req.body;

    const session = await req.prisma.breathingSession.create({
      data: {
        userId: req.user.id,
        technique,
        duration,
        cycles_completed,
        mood_before,
        mood_after
      }
    });

    console.log('✅ Breathing session saved:', session);

    res.json({
      success: true,
      session: {
        id: session.id,
        technique: session.technique,
        duration: session.duration,
        cycles_completed: session.cycles_completed,
        createdAt: session.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Error saving breathing session:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save breathing session',
      details: error.message 
    });
  }
});

// Get user's breathing sessions
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = await req.prisma.breathingSession.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10 // Last 10 sessions
    });

    res.json({ sessions });

  } catch (error) {
    console.error('❌ Error fetching breathing sessions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch breathing sessions',
      details: error.message 
    });
  }
});

// Get breathing session stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalSessions = await req.prisma.breathingSession.count({
      where: { userId: req.user.id }
    });

    const totalMinutes = await req.prisma.breathingSession.aggregate({
      where: { userId: req.user.id },
      _sum: {
        duration: true
      }
    });

    const favoriteTechnique = await req.prisma.breathingSession.groupBy({
      by: ['technique'],
      where: { userId: req.user.id },
      _count: {
        technique: true
      },
      orderBy: {
        _count: {
          technique: 'desc'
        }
      },
      take: 1
    });

    res.json({
      totalSessions,
      totalMinutes: Math.floor((totalMinutes._sum.duration || 0) / 60),
      favoriteTechnique: favoriteTechnique[0]?.technique || 'None'
    });

  } catch (error) {
    console.error('❌ Error fetching breathing stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch breathing stats',
      details: error.message 
    });
  }
});

module.exports = router;  '@
