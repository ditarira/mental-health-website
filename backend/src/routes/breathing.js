const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const sessions = await prisma.breathingSession.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: sessions,
      message: 'Breathing sessions retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching breathing sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch breathing sessions',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { duration, type, completed } = req.body;

    const session = await prisma.breathingSession.create({
      data: {
        duration: parseInt(duration) || 0,
        type: type || 'unknown',
        completed: completed || false,
        userId: "cmdar2tus0000bn3jtjiw8662"
      }
    });

    res.json({
      success: true,
      data: session,
      message: 'Breathing session saved successfully'
    });

  } catch (error) {
    console.error('Error saving breathing session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save breathing session',
      error: error.message
    });
  }
});

module.exports = router;