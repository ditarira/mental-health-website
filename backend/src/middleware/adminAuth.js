const adminAuth = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const isAdmin = req.user.role === 'ADMIN' || req.user.email === 'admin@mindfulme.com';

    if (!isAdmin) {
      console.log('Non-admin user attempted admin access:', req.user.email);
      return res.status(403).json({
        success: false,
        message: 'Admin access required. Insufficient privileges.'
      });
    }

    console.log('Admin access granted to:', req.user.email);
    next();

  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization error',
      error: error.message
    });
  }
};

module.exports = adminAuth;