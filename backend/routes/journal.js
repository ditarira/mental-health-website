const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all journal entries for the authenticated user
router.get('/', async (req, res) => {
  try {
    console.log('📝 Fetching journal entries for user:', req.user.email);
    
    const entries = await prisma.journalEntry.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        mood: true,
        tags: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    console.log('✅ Found', entries.length, 'journal entries');
    res.json({ entries, count: entries.length });
    
  } catch (error) {
    console.error('❌ Journal fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch journal entries',
      details: error.message 
    });
  }
});

// Get a specific journal entry
router.get('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    console.log('📝 Fetching journal entry:', entryId);
    
    const entry = await prisma.journalEntry.findFirst({
      where: { 
        id: entryId,
        userId: req.user.id
      }
    });
    
    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    
    console.log('✅ Journal entry found');
    res.json(entry);
    
  } catch (error) {
    console.error('❌ Journal entry fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch journal entry',
      details: error.message 
    });
  }
});

// Create a new journal entry
router.post('/', async (req, res) => {
  try {
    const { title, content, mood, tags } = req.body;
    
    console.log('📝 Creating journal entry for user:', req.user.email);
    
    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    if (mood && !['VERY_SAD', 'SAD', 'NEUTRAL', 'HAPPY', 'VERY_HAPPY'].includes(mood)) {
      return res.status(400).json({ error: 'Invalid mood value' });
    }
    
    const entry = await prisma.journalEntry.create({
      data: {
        title,
        content,
        mood: mood || 'NEUTRAL',
        tags: tags || [],
        userId: req.user.id
      }
    });
    
    console.log('✅ Journal entry created:', entry.id);
    res.status(201).json(entry);
    
  } catch (error) {
    console.error('❌ Journal creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create journal entry',
      details: error.message 
    });
  }
});

// Update a journal entry
router.put('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    const { title, content, mood, tags } = req.body;
    
    console.log('📝 Updating journal entry:', entryId);
    
    // Check if entry exists and belongs to user
    const existingEntry = await prisma.journalEntry.findFirst({
      where: { 
        id: entryId,
        userId: req.user.id
      }
    });
    
    if (!existingEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    
    // Validation
    if (mood && !['VERY_SAD', 'SAD', 'NEUTRAL', 'HAPPY', 'VERY_HAPPY'].includes(mood)) {
      return res.status(400).json({ error: 'Invalid mood value' });
    }
    
    const entry = await prisma.journalEntry.update({
      where: { id: entryId },
      data: {
        title: title || existingEntry.title,
        content: content || existingEntry.content,
        mood: mood || existingEntry.mood,
        tags: tags !== undefined ? tags : existingEntry.tags
      }
    });
    
    console.log('✅ Journal entry updated:', entry.id);
    res.json(entry);
    
  } catch (error) {
    console.error('❌ Journal update error:', error);
    res.status(500).json({ 
      error: 'Failed to update journal entry',
      details: error.message 
    });
  }
});

// Delete a journal entry
router.delete('/:id', async (req, res) => {
  try {
    const entryId = req.params.id;
    
    console.log('📝 Deleting journal entry:', entryId);
    
    // Check if entry exists and belongs to user
    const existingEntry = await prisma.journalEntry.findFirst({
      where: { 
        id: entryId,
        userId: req.user.id
      }
    });
    
    if (!existingEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    
    await prisma.journalEntry.delete({
      where: { id: entryId }
    });
    
    console.log('✅ Journal entry deleted');
    res.json({ message: 'Journal entry deleted successfully' });
    
  } catch (error) {
    console.error('❌ Journal deletion error:', error);
    res.status(500).json({ 
      error: 'Failed to delete journal entry',
      details: error.message 
    });
  }
});

module.exports = router;
