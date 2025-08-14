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
// Update journal entry
router.put('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    const { title, content, mood } = req.body;
    
    console.log('Updating journal entry:', entryId, 'for user:', req.user.email);

    const updatedEntry = await prisma.journalEntry.update({
      where: { 
        id: entryId,
        userId: req.user.id // Ensure user can only edit their own entries
      },
      data: {
        title: title || 'Untitled Entry',
        content,
        mood: mood || '3'
      }
    });

    console.log('Entry updated successfully');
    res.json({
      success: true,
      message: 'Journal entry updated successfully',
      data: updatedEntry
    });

  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update journal entry',
      details: error.message
    });
  }
});

// Delete journal entry
router.delete('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    
    console.log('Deleting journal entry:', entryId, 'for user:', req.user.email);

    await prisma.journalEntry.delete({
      where: { 
        id: entryId,
        userId: req.user.id // Ensure user can only delete their own entries
      }
    });

    console.log('Entry deleted successfully');
    res.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete journal entry',
      details: error.message
    });
  }
});

// Delete journal entry
router.delete('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    
    console.log('🗑️ Deleting journal entry:', entryId, 'for user:', req.user.email);

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

    console.log('✅ Entry deleted successfully');
    res.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting journal entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete journal entry',
      details: error.message
    });
  }
});
