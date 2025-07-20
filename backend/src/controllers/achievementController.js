// src/controllers/achievementController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserAchievements = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user achievements from database
    const achievements = await prisma.userAchievement.findMany({
      where: { userId }
    });
    
    res.json({ achievements });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ error: 'Failed to get achievements' });
  }
};

const unlockAchievements = async (req, res) => {
  try {
    const { userId, achievements } = req.body;
    
    // Create achievement records
    const newAchievements = await Promise.all(
      achievements.map(achievementId => 
        prisma.userAchievement.create({
          data: {
            userId,
            achievementId,
            unlockedAt: new Date()
          }
        })
      )
    );
    
    res.json({ achievements: newAchievements });
  } catch (error) {
    console.error('Unlock achievements error:', error);
    res.status(500).json({ error: 'Failed to unlock achievements' });
  }
};

module.exports = {
  getUserAchievements,
  unlockAchievements
};
