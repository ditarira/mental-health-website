const express = require('express');
const router = express.Router();

// Get mental health resources
router.get('/', async (req, res) => {
  try {
    console.log('📚 Fetching resources for user:', req.user.email);
    
    const resources = [
      {
        id: 1,
        title: 'Crisis Hotlines',
        description: 'Emergency mental health support',
        type: 'emergency',
        content: [
          'National Suicide Prevention Lifeline: 988',
          'Crisis Text Line: Text HOME to 741741',
          'International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/'
        ]
      },
      {
        id: 2,
        title: 'Mindfulness Techniques',
        description: 'Daily practices for mental wellness',
        type: 'practice',
        content: [
          'Deep breathing exercises',
          'Progressive muscle relaxation',
          'Meditation and mindfulness',
          'Grounding techniques'
        ]
      },
      {
        id: 3,
        title: 'Professional Help',
        description: 'Finding mental health professionals',
        type: 'professional',
        content: [
          'Psychology Today: Find a therapist',
          'BetterHelp: Online therapy',
          'Local community mental health centers',
          'Employee assistance programs'
        ]
      }
    ];
    
    console.log('✅ Resources retrieved');
    res.json({ resources, count: resources.length });
    
  } catch (error) {
    console.error('❌ Resources fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch resources',
      details: error.message 
    });
  }
});

module.exports = router;
