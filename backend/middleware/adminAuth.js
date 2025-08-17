const auth = require('./auth');

const adminAuth = async (req, res, next) => {
  try {
    // First run normal auth
    await new Promise((resolve, reject) => {
      auth(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Check if user is admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied. Admin rights required.' });
    }

    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(401).json({ error: 'Authentication failed.' });
  }
};

module.exports = adminAuth;
