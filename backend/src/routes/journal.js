// src/routes/journal.js
const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const { authMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Journal routes
router.get('/', journalController.getJournalEntries);
router.post('/', journalController.createJournalEntry);
router.put('/:id', journalController.updateJournalEntry);
router.delete('/:id', journalController.deleteJournalEntry);

module.exports = router;
