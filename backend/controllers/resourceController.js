const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Sample resources data to seed the database
const sampleResources = [
  {
    title: "National Suicide Prevention Lifeline",
    description: "24/7 free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    category: "crisis",
    type: "hotline",
    contact: "988",
    website: "https://suicidepreventionlifeline.org/",
    availability: "24/7",
    icon: "🆘",
    featured: true
  },
  {
    title: "Crisis Text Line",
    description: "Free 24/7 support for those in crisis. Text HOME to 741741 from anywhere in the US.",
    category: "crisis",
    type: "text",
    contact: "Text HOME to 741741",
    website: "https://www.crisistextline.org/",
    availability: "24/7",
    icon: "💬",
    featured: true
  },
  {
    title: "SAMHSA National Helpline",
    description: "Treatment referral and information service for mental health and substance abuse disorders.",
    category: "crisis",
    type: "hotline",
    contact: "1-800-662-4357",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    availability: "24/7",
    icon: "🏥",
    featured: false
  },
  {
    title: "BetterHelp",
    description: "Professional counseling online with licensed therapists. Start therapy from the comfort of your home.",
    category: "therapy",
    type: "online",
    contact: "Online Platform",
    website: "https://www.betterhelp.com/",
    availability: "Flexible",
    icon: "👩‍⚕️",
    featured: true
  },
  {
    title: "Psychology Today",
    description: "Find therapists, psychiatrists, treatment centers, and support groups in your area.",
    category: "therapy",
    type: "directory",
    contact: "Online Directory",
    website: "https://www.psychologytoday.com/",
    availability: "Always available",
    icon: "🔍",
    featured: false
  },
  {
    title: "Headspace",
    description: "Meditation and mindfulness app with guided sessions for stress, sleep, and anxiety management.",
    category: "selfhelp",
    type: "app",
    contact: "Mobile App",
    website: "https://www.headspace.com/",
    availability: "Always available",
    icon: "🧘‍♀️",
    featured: false
  },
  {
    title: "Calm",
    description: "Sleep stories, meditation, and relaxation tools to help reduce anxiety and improve sleep quality.",
    category: "selfhelp",
    type: "app",
    contact: "Mobile App",
    website: "https://www.calm.com/",
    availability: "Always available",
    icon: "🌙",
    featured: false
  },
  {
    title: "NAMI Support Groups",
    description: "National Alliance on Mental Illness peer-led support groups for individuals and families.",
    category: "support",
    type: "group",
    contact: "Local Chapters",
    website: "https://www.nami.org/Support-Education/Support-Groups",
    availability: "Scheduled meetings",
    icon: "👥",
    featured: false
  }
];

const resourceController = {
  // Get all resources
  getAllResources: async (req, res) => {
    try {
      const { category, search, featured } = req.query;
      
      let whereClause = { isActive: true };
      
      // Filter by category
      if (category && category !== 'all') {
        whereClause.category = category;
      }
      
      // Filter by search term
      if (search) {
        whereClause.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ];
      }
      
      // Filter by featured
      if (featured === 'true') {
        whereClause.featured = true;
      }
      
      const resources = await prisma.resource.findMany({
        where: whereClause,
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' }
        ]
      });
      
      res.json({
        success: true,
        data: resources,
        count: resources.length
      });
    } catch (error) {
      console.error('Get resources error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching resources'
      });
    }
  },

  // Get single resource
  getResource: async (req, res) => {
    try {
      const { id } = req.params;
      
      const resource = await prisma.resource.findUnique({
        where: { 
          id: parseInt(id),
          isActive: true 
        }
      });
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }
      
      res.json({
        success: true,
        data: resource
      });
    } catch (error) {
      console.error('Get resource error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching resource'
      });
    }
  },

  // Save user favorites
  saveFavorites: async (req, res) => {
    try {
      const { resourceIds } = req.body;
      const userId = req.user.id;
      
      // Remove existing favorites
      await prisma.userResourceFavorite.deleteMany({
        where: { userId }
      });
      
      // Add new favorites
      if (resourceIds && resourceIds.length > 0) {
        const favorites = resourceIds.map(resourceId => ({
          userId,
          resourceId: parseInt(resourceId)
        }));
        
        await prisma.userResourceFavorite.createMany({
          data: favorites
        });
      }
      
      res.json({
        success: true,
        message: 'Favorites updated successfully',
        data: { userId, favorites: resourceIds }
      });
    } catch (error) {
      console.error('Save favorites error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating favorites'
      });
    }
  },

  // Get user favorites
  getUserFavorites: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const favorites = await prisma.userResourceFavorite.findMany({
        where: { userId },
        include: {
          resource: true
        }
      });
      
      const favoriteIds = favorites.map(fav => fav.resourceId);
      const favoriteResources = favorites.map(fav => fav.resource);
      
      res.json({
        success: true,
        data: {
          favoriteIds,
          resources: favoriteResources
        },
        userId
      });
    } catch (error) {
      console.error('Get favorites error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching favorites'
      });
    }
  },

  // Get resource statistics
  getStats: async (req, res) => {
    try {
      const total = await prisma.resource.count({ where: { isActive: true } });
      
      const byCategory = {
        crisis: await prisma.resource.count({ where: { category: 'crisis', isActive: true } }),
        therapy: await prisma.resource.count({ where: { category: 'therapy', isActive: true } }),
        selfhelp: await prisma.resource.count({ where: { category: 'selfhelp', isActive: true } }),
        support: await prisma.resource.count({ where: { category: 'support', isActive: true } }),
        education: await prisma.resource.count({ where: { category: 'education', isActive: true } })
      };
      
      const featured = await prisma.resource.count({ where: { featured: true, isActive: true } });
      
      res.json({
        success: true,
        data: {
          total,
          byCategory,
          featured
        }
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching statistics'
      });
    }
  },

  // Seed resources (admin function)
  seedResources: async (req, res) => {
    try {
      // Check if resources already exist
      const existingCount = await prisma.resource.count();
      
      if (existingCount > 0) {
        return res.json({
          success: true,
          message: 'Resources already exist in database',
          count: existingCount
        });
      }
      
      // Create resources
      const createdResources = await prisma.resource.createMany({
        data: sampleResources
      });
      
      res.json({
        success: true,
        message: 'Resources seeded successfully',
        count: createdResources.count
      });
    } catch (error) {
      console.error('Seed resources error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while seeding resources'
      });
    }
  }
};

module.exports = resourceController;
