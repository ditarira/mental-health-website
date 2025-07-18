// src/controllers/breathingController.js
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Get all breathing sessions for user
const getBreathingSessions = async (req, res) => {
  try {
    const sessions = await prisma.breathingSession.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ sessions });
  } catch (error) {
    console.error('Get breathing sessions error:', error);
    res.status(500).json({ error: 'Failed to get breathing sessions' });
  }
};

// Create new breathing session
const createBreathingSession = async (req, res) => {
  try {
    const { duration, type } = req.body;

    if (!duration || !type) {
      return res.status(400).json({ error: 'Duration and type are required' });
    }

    const session = await prisma.breathingSession.create({
      data: {
        userId: req.user.id,
        duration: parseInt(duration),
        type,
        completed: true
      }
    });

    res.status(201).json({ session });
  } catch (error) {
    console.error('Create breathing session error:', error);
    res.status(500).json({ error: 'Failed to create breathing session' });
  }
};

// Get breathing session stats for user
const getBreathingStats = async (req, res) => {
  try {
    const totalSessions = await prisma.breathingSession.count({
      where: { userId: req.user.id }
    });

    const totalDuration = await prisma.breathingSession.aggregate({
      where: { userId: req.user.id },
      _sum: { duration: true }
    });

    const recentSessions = await prisma.breathingSession.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    res.json({
      totalSessions,
      totalDuration: totalDuration._sum.duration || 0,
      recentSessions
    });
  } catch (error) {
    console.error('Get breathing stats error:', error);
    res.status(500).json({ error: 'Failed to get breathing stats' });
  }
};

module.exports = {
  getBreathingSessions,
  createBreathingSession,
  getBreathingStats
};
