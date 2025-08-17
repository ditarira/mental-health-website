const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all breathing sessions for a user
const getBreathingSessions = async (req, res) => {
  try {
    console.log('????? Getting breathing sessions for user:', req.user.id);
    
    const userId = req.user.id;
    
    const sessions = await prisma.breathingSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    console.log(`? Found ${sessions.length} breathing sessions`);

    res.json({
      success: true,
      data: sessions.map(session => ({
        id: session.id,
        type: session.type,
        duration: session.duration,
        completed: session.completed,
        createdAt: session.createdAt,
        user: {
          firstName: session.users.firstName,
          lastName: session.users.lastName,
          email: session.users.email
        }
      }))
    });

  } catch (error) {
    console.error('? Get breathing sessions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch breathing sessions',
      details: error.message
    });
  }
};

// Create a new breathing session
const createBreathingSession = async (req, res) => {
  try {
    console.log('????? Creating breathing session for user:', req.user.id);
    
    const { type, duration, completed } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!type || !duration) {
      return res.status(400).json({
        success: false,
        error: 'Type and duration are required'
      });
    }

    const session = await prisma.breathingSession.create({
      data: {
        userId,
        type: type.trim(),
        duration: parseInt(duration),
        completed: completed || false
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    console.log('? Breathing session created successfully:', session.id);

    res.status(201).json({
      success: true,
      data: {
        id: session.id,
        type: session.type,
        duration: session.duration,
        completed: session.completed,
        createdAt: session.createdAt,
        user: {
          firstName: session.users.firstName,
          lastName: session.users.lastName,
          email: session.users.email
        }
      }
    });

  } catch (error) {
    console.error('? Create breathing session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create breathing session',
      details: error.message
    });
  }
};

// Get breathing statistics for user
const getBreathingStats = async (req, res) => {
  try {
    console.log('?? Getting breathing stats for user:', req.user.id);
    
    const userId = req.user.id;

    // Total sessions
    const totalSessions = await prisma.breathingSession.count({
      where: { userId }
    });

    // Completed sessions
    const completedSessions = await prisma.breathingSession.count({
      where: { 
        userId,
        completed: true
      }
    });

    // Total duration
    const sessions = await prisma.breathingSession.findMany({
      where: { userId },
      select: { duration: true }
    });

    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);

    // Sessions by type
    const sessionsByType = await prisma.breathingSession.groupBy({
      by: ['type'],
      where: { userId },
      _count: { type: true },
      _sum: { duration: true },
      orderBy: { _count: { type: 'desc' } }
    });

    // Recent sessions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentSessions = await prisma.breathingSession.count({
      where: {
        userId,
        createdAt: { gte: sevenDaysAgo }
      }
    });

    // Favorite exercise (most practiced)
    const favoriteExercise = sessionsByType.length > 0 ? sessionsByType[0].type : null;

    const stats = {
      totalSessions,
      completedSessions,
      totalDuration,
      recentSessions,
      favoriteExercise,
      sessionsByType: sessionsByType.map(group => ({
        type: group.type,
        count: group._count.type,
        totalDuration: group._sum.duration
      })),
      completionRate: totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0
    };

    console.log('? Breathing stats retrieved successfully');

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('? Get breathing stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch breathing stats',
      details: error.message
    });
  }
};

// Update breathing session (mark as completed)
const updateBreathingSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, duration } = req.body;
    const userId = req.user.id;

    console.log('????? Updating breathing session:', id, 'for user:', userId);

    // Check if session exists and belongs to user
    const existingSession = await prisma.breathingSession.findFirst({
      where: { 
        id: id,
        userId: userId
      }
    });

    if (!existingSession) {
      return res.status(404).json({
        success: false,
        error: 'Breathing session not found'
      });
    }

    const updatedSession = await prisma.breathingSession.update({
      where: { id: id },
      data: {
        completed: completed !== undefined ? completed : existingSession.completed,
        duration: duration !== undefined ? parseInt(duration) : existingSession.duration
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    console.log('? Breathing session updated successfully');

    res.json({
      success: true,
      data: {
        id: updatedSession.id,
        type: updatedSession.type,
        duration: updatedSession.duration,
        completed: updatedSession.completed,
        createdAt: updatedSession.createdAt,
        user: {
          firstName: updatedSession.users.firstName,
          lastName: updatedSession.users.lastName,
          email: updatedSession.users.email
        }
      }
    });

  } catch (error) {
    console.error('? Update breathing session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update breathing session',
      details: error.message
    });
  }
};

// Delete breathing session
const deleteBreathingSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log('??? Deleting breathing session:', id, 'for user:', userId);

    // Check if session exists and belongs to user
    const existingSession = await prisma.breathingSession.findFirst({
      where: { 
        id: id,
        userId: userId
      }
    });

    if (!existingSession) {
      return res.status(404).json({
        success: false,
        error: 'Breathing session not found'
      });
    }

    await prisma.breathingSession.delete({
      where: { id: id }
    });

    console.log('? Breathing session deleted successfully');

    res.json({
      success: true,
      message: 'Breathing session deleted successfully'
    });

  } catch (error) {
    console.error('? Delete breathing session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete breathing session',
      details: error.message
    });
  }
};

module.exports = {
  getBreathingSessions,
  createBreathingSession,
  getBreathingStats,
  updateBreathingSession,
  deleteBreathingSession
};
