const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Apply auth middleware to all journal routes
router.use(auth);

// Get all journal entries for the authenticated user
router.get('/', async (req, res) => {
  try {
    console.log('?? Fetching journal entries for user:', req.user.email);

    const entries = await prisma.journalEntry.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        mood: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log('? Found', entries.length, 'entries for user');
    res.json({
      success: true,
      data: entries,
      count: entries.length
    });

  } catch (error) {
    console.error('? Error fetching journal entries:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch journal entries',
      details: error.message
    });
  }
});

// Create a new journal entry
router.post('/', async (req, res) => {
  try {
    const { title, content, mood, tags } = req.body;
    
    console.log('?? Creating journal entry for user:', req.user.email);
    console.log('Entry data:', { title, content, mood });

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    const entry = await prisma.journalEntry.create({
      data: {
        title: title || 'Untitled Entry',
        content: content.trim(),
        mood: mood || '3',
        userId: req.user.id
      }
    });

    console.log('? Journal entry created with ID:', entry.id);
    res.status(201).json({
      success: true,
      message: 'Journal entry created successfully',
      data: entry
    });

  } catch (error) {
    console.error('? Error creating journal entry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create journal entry',
      details: error.message
    });
  }
});

// Get a specific journal entry
router.get('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    console.log('?? Fetching journal entry:', entryId);

    const entry = await prisma.journalEntry.findFirst({
      where: { 
        id: entryId,
        userId: req.user.id 
      }
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    console.log('? Entry found');
    res.json({
      success: true,
      data: entry
    });

  } catch (error) {
    console.error('? Error fetching journal entry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch journal entry',
      details: error.message
    });
  }
});

// Update a journal entry
router.put('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    const { title, content, mood } = req.body;
    
    console.log('?? Updating journal entry:', entryId, 'for user:', req.user.email);

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    // First check if entry exists and belongs to user
    const existingEntry = await prisma.journalEntry.findFirst({
      where: { 
        id: entryId,
        userId: req.user.id 
      }
    });

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found or access denied'
      });
    }

    // Update the entry
    const updatedEntry = await prisma.journalEntry.update({
      where: { 
        id: entryId
      },
      data: {
        title: title || 'Untitled Entry',
        content: content.trim(),
        mood: mood || '3'
      }
    });

    console.log('? Entry updated successfully');
    res.json({
      success: true,
      message: 'Journal entry updated successfully',
      data: updatedEntry
    });

  } catch (error) {
    console.error('? Error updating journal entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update journal entry',
      details: error.message
    });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    
    console.log('??? Deleting journal entry:', entryId, 'for user:', req.user.email);

    // First check if entry exists and belongs to user
    const existingEntry = await prisma.journalEntry.findFirst({
      where: { 
        id: entryId,
        userId: req.user.id 
      }
    });

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found or access denied'
      });
    }

    // Delete the entry
    await prisma.journalEntry.delete({
      where: { 
        id: entryId
      }
    });

    console.log('? Entry deleted successfully');
    res.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });

  } catch (error) {
    console.error('? Error deleting journal entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete journal entry',
      details: error.message
    });
  }
});

module.exports = router;
