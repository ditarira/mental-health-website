const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: entries,
      message: 'Journal entries retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch journal entries',
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, mood, tags } = req.body;

    const entry = await prisma.journalEntry.create({
      data: {
        title,
        content,
        mood,
        tags: tags || [],
        userId: "cmdar2tus0000bn3jtjiw8662"
      }
    });

    res.json({
      success: true,
      data: entry,
      message: 'Journal entry created successfully'
    });

  } catch (error) {
    console.error('Error creating journal entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create journal entry',
      error: error.message
    });
  }
});

module.exports = router;