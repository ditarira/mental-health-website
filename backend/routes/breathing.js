const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all breathing sessions for the authenticated user
router.get('/', async (req, res) => {
  try {
    console.log('🫁 Fetching breathing sessions for user:', req.user.email);
    
    const sessions = await prisma.breathingSession.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        duration: true,
        completed: true,
        createdAt: true
      }
    });
    
    console.log('✅ Found', sessions.length, 'breathing sessions');
    res.json({ sessions, count: sessions.length });
    
  } catch (error) {
    console.error('❌ Breathing sessions fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch breathing sessions',
      details: error.message 
    });
  }
});

// Get a specific breathing session
router.get('/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;
    console.log('🫁 Fetching breathing session:', sessionId);
    
    const session = await prisma.breathingSession.findFirst({
      where: { 
        id: sessionId,
        userId: req.user.id
      }
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Breathing session not found' });
    }
    
    console.log('✅ Breathing session found');
    res.json(session);
    
  } catch (error) {
    console.error('❌ Breathing session fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch breathing session',
      details: error.message 
    });
  }
});

// Create a new breathing session
router.post('/', async (req, res) => {
  try {
    const { type, duration, completed } = req.body;
    
    console.log('🫁 Creating breathing session for user:', req.user.email);
    
    // Validation
    if (!type) {
      return res.status(400).json({ error: 'Session type is required' });
    }
    
    if (!duration || duration < 0) {
      return res.status(400).json({ error: 'Valid duration is required' });
    }
    
    // Valid breathing exercise types
    const validTypes = ['BOX_BREATHING', 'DEEP_BREATHING', 'CALM_BREATHING', 'ENERGIZING_BREATHING'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid breathing exercise type' });
    }
    
    const session = await prisma.breathingSession.create({
      data: {
        type,
        duration: parseInt(duration),
        completed: completed || false,
        userId: req.user.id
      }
    });
    
    console.log('✅ Breathing session created:', session.id);
    res.status(201).json(session);
    
  } catch (error) {
    console.error('❌ Breathing session creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create breathing session',
      details: error.message 
    });
  }
});

// Update a breathing session (mainly to mark as completed)
router.put('/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;
    const { completed, duration } = req.body;
    
    console.log('🫁 Updating breathing session:', sessionId);
    
    // Check if session exists and belongs to user
    const existingSession = await prisma.breathingSession.findFirst({
      where: { 
        id: sessionId,
        userId: req.user.id
      }
    });
    
    if (!existingSession) {
      return res.status(404).json({ error: 'Breathing session not found' });
    }
    
    const session = await prisma.breathingSession.update({
      where: { id: sessionId },
      data: {
        completed: completed !== undefined ? completed : existingSession.completed,
        duration: duration !== undefined ? parseInt(duration) : existingSession.duration
      }
    });
    
    console.log('✅ Breathing session updated:', session.id);
    res.json(session);
    
  } catch (error) {
    console.error('❌ Breathing session update error:', error);
    res.status(500).json({ 
      error: 'Failed to update breathing session',
      details: error.message 
    });
  }
});

// Delete a breathing session
router.delete('/:id', async (req, res) => {
  try {
    const sessionId = req.params.id;
    
    console.log('🫁 Deleting breathing session:', sessionId);
    
    // Check if session exists and belongs to user
    const existingSession = await prisma.breathingSession.findFirst({
      where: { 
        id: sessionId,
        userId: req.user.id
      }
    });
    
    if (!existingSession) {
      return res.status(404).json({ error: 'Breathing session not found' });
    }
    
    await prisma.breathingSession.delete({
      where: { id: sessionId }
    });
    
    console.log('✅ Breathing session deleted');
    res.json({ message: 'Breathing session deleted successfully' });
    
  } catch (error) {
    console.error('❌ Breathing session deletion error:', error);
    res.status(500).json({ 
      error: 'Failed to delete breathing session',
      details: error.message 
    });
  }
});

// Get breathing session statistics
router.get('/stats/summary', async (req, res) => {
  try {
    console.log('📊 Fetching breathing stats for user:', req.user.email);
    
    const totalSessions = await prisma.breathingSession.count({
      where: { userId: req.user.id }
    });
    
    const completedSessions = await prisma.breathingSession.count({
      where: { 
        userId: req.user.id,
        completed: true
      }
    });
    
    const totalDuration = await prisma.breathingSession.aggregate({
      where: { 
        userId: req.user.id,
        completed: true
      },
      _sum: {
        duration: true
      }
    });
    
    const stats = {
      totalSessions,
      completedSessions,
      totalMinutes: Math.round((totalDuration._sum.duration || 0) / 60),
      completionRate: totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0
    };
    
    console.log('✅ Breathing stats computed');
    res.json(stats);
    
  } catch (error) {
    console.error('❌ Breathing stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch breathing statistics',
      details: error.message 
    });
  }
});

module.exports = router;
