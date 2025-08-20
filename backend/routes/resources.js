const express = require('express');
const router = express.Router();

// Get mental health resources
router.get('/', (req, res) => {
  const resources = [
    {
      id: 1,
      title: "Crisis Text Line",
      description: "24/7 crisis support via text",
      contact: "Text HOME to 741741",
      category: "crisis"
    },
    {
      id: 2,
      title: "National Suicide Prevention Lifeline",
      description: "24/7 crisis support via phone",
      contact: "Call 988",
      category: "crisis"
    },
    {
      id: 3,
      title: "Mental Health America",
      description: "Mental health information and support",
      contact: "Visit mhanational.org",
      category: "support"
    }
  ];

  res.json(resources);
});

module.exports = router;
