const express = require('express');
const { 
  getJournalEntries, 
  createJournalEntry, 
  getJournalEntry, 
  updateJournalEntry, 
  deleteJournalEntry 
} = require('../controllers/journalController');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all journal entries for user
router.get('/', auth, getJournalEntries);

// Create new journal entry
router.post('/', auth, createJournalEntry);

// Get specific journal entry
router.get('/:id', auth, getJournalEntry);

// Update journal entry
router.put('/:id', auth, updateJournalEntry);

// Delete journal entry
router.delete('/:id', auth, deleteJournalEntry);

module.exports = router;
