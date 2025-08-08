const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token, authorization denied'
    });
  }

  try {
    // Remove 'Bearer ' from token
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || 'fallback-secret');
    
    // Add user to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

module.exports = auth;
