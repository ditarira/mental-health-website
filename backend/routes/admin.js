const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalJournalEntries = await prisma.journalEntry.count();
    const totalBreathingSessions = await prisma.breathingSession.count();
    
    // Count users active in last 30 minutes (truly active)
    const activeUsers = await prisma.user.count({
      where: {
        lastActiveAt: {
          gte: new Date(Date.now() - 30 * 60 * 1000) // Last 30 minutes
        }
      }
    });

    const stats = {
      totalUsers,
      totalJournalEntries,
      totalBreathingSessions,
      activeUsers, // Now shows real active users!
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: stats,
      message: 'Admin statistics retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics',
      error: error.message
    });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        lastActiveAt: true,
        isOnline: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Add activity status to each user
    const usersWithActivity = users.map(user => ({
      ...user,
      activityLevel: isUserActive(user.lastActiveAt) ? 'Active' : 'Inactive'
    }));

    res.json({
      success: true,
      data: usersWithActivity,
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// ADD THIS RESET ROUTE
router.post('/reset-activity', async (req, res) => {
  try {
    console.log('🔄 Resetting all user activity...');
    
    // Set everyone to inactive (2 hours ago)
    const result = await prisma.user.updateMany({
      data: { 
        lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isOnline: false 
      }
    });
    
    console.log(`✅ Reset ${result.count} users to inactive`);
    
    res.json({ 
      success: true, 
      message: `Reset ${result.count} users to inactive`,
      count: result.count
    });
  } catch (error) {
    console.error('❌ Reset failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Helper function to check if user is active
function isUserActive(lastActiveAt) {
  if (!lastActiveAt) return false;
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  return new Date(lastActiveAt) > thirtyMinutesAgo;
}

module.exports = router;