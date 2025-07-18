// src/controllers/journalController.js
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

// Get all journal entries for user
const getJournalEntries = async (req, res) => {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId: req.user.id },
      orderBy: { date: 'desc' }
    });

    res.json({ entries });
  } catch (error) {
    console.error('Get journal entries error:', error);
    res.status(500).json({ error: 'Failed to get journal entries' });
  }
};

// Create new journal entry
const createJournalEntry = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    if (!content || mood === undefined) {
      return res.status(400).json({ error: 'Content and mood are required' });
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId: req.user.id,
        title: title || '',
        content,
        mood: parseInt(mood)
      }
    });

    res.status(201).json({ entry });
  } catch (error) {
    console.error('Create journal entry error:', error);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
};

// Update journal entry
const updateJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, mood } = req.body;

    // Check if entry belongs to user
    const entry = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: { id },
      data: {
        title,
        content,
        mood: mood !== undefined ? parseInt(mood) : undefined
      }
    });

    res.json({ entry: updatedEntry });
  } catch (error) {
    console.error('Update journal entry error:', error);
    res.status(500).json({ error: 'Failed to update journal entry' });
  }
};

// Delete journal entry
const deleteJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if entry belongs to user
    const entry = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    await prisma.journalEntry.delete({
      where: { id }
    });

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Delete journal entry error:', error);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
};

module.exports = {
  getJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
};
