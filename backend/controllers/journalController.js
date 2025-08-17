const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all journal entries for a user
const getJournalEntries = async (req, res) => {
  try {
    console.log('?? Getting journal entries for user:', req.user.id);
    
    const userId = req.user.id;
    
    const entries = await prisma.journalEntry.findMany({
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

    console.log(`? Found ${entries.length} journal entries`);

    res.json({
      success: true,
      data: entries.map(entry => ({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        author: {
          firstName: entry.users.firstName,
          lastName: entry.users.lastName,
          email: entry.users.email
        }
      }))
    });

  } catch (error) {
    console.error('? Get journal entries error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch journal entries',
      details: error.message
    });
  }
};

// Create a new journal entry
const createJournalEntry = async (req, res) => {
  try {
    console.log('?? Creating journal entry for user:', req.user.id);
    
    const { title, content, mood, tags } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        title: title.trim(),
        content: content.trim(),
        mood: mood || '3', // Default neutral mood
        tags: tags || [],
        updatedAt: new Date()
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

    console.log('? Journal entry created successfully:', entry.id);

    res.status(201).json({
      success: true,
      data: {
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        author: {
          firstName: entry.users.firstName,
          lastName: entry.users.lastName,
          email: entry.users.email
        }
      }
    });

  } catch (error) {
    console.error('? Create journal entry error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create journal entry',
      details: error.message
    });
  }
};

// Get a specific journal entry
const getJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log('?? Getting journal entry:', id, 'for user:', userId);

    const entry = await prisma.journalEntry.findFirst({
      where: { 
        id: id,
        userId: userId // Ensure user can only see their own entries
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

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: 'Journal entry not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
        author: {
          firstName: entry.users.firstName,
          lastName: entry.users.lastName,
          email: entry.users.email
        }
      }
    });

  } catch (error) {
    console.error('? Get journal entry error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch journal entry',
      details: error.message
    });
  }
};

// Update a journal entry
const updateJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, mood, tags } = req.body;
    const userId = req.user.id;

    console.log('?? Updating journal entry:', id, 'for user:', userId);

    // Check if entry exists and belongs to user
    const existingEntry = await prisma.journalEntry.findFirst({
      where: { 
        id: id,
        userId: userId
      }
    });

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        error: 'Journal entry not found'
      });
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: { id: id },
      data: {
        title: title?.trim() || existingEntry.title,
        content: content?.trim() || existingEntry.content,
        mood: mood || existingEntry.mood,
        tags: tags || existingEntry.tags,
        updatedAt: new Date()
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

    console.log('? Journal entry updated successfully');

    res.json({
      success: true,
      data: {
        id: updatedEntry.id,
        title: updatedEntry.title,
        content: updatedEntry.content,
        mood: updatedEntry.mood,
        tags: updatedEntry.tags,
        createdAt: updatedEntry.createdAt,
        updatedAt: updatedEntry.updatedAt,
        author: {
          firstName: updatedEntry.users.firstName,
          lastName: updatedEntry.users.lastName,
          email: updatedEntry.users.email
        }
      }
    });

  } catch (error) {
    console.error('? Update journal entry error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update journal entry',
      details: error.message
    });
  }
};

// Delete a journal entry
const deleteJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log('??? Deleting journal entry:', id, 'for user:', userId);

    // Check if entry exists and belongs to user
    const existingEntry = await prisma.journalEntry.findFirst({
      where: { 
        id: id,
        userId: userId
      }
    });

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        error: 'Journal entry not found'
      });
    }

    await prisma.journalEntry.delete({
      where: { id: id }
    });

    console.log('? Journal entry deleted successfully');

    res.json({
      success: true,
      message: 'Journal entry deleted successfully'
    });

  } catch (error) {
    console.error('? Delete journal entry error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete journal entry',
      details: error.message
    });
  }
};

module.exports = {
  getJournalEntries,
  createJournalEntry,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
};
