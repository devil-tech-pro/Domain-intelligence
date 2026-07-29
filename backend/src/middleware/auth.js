const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const auth = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' from string
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Add user from payload to request
    req.user = decoded.user;
    
    next();
  } catch (error) {
    logger.error(`Auth error: ${error.message}`);
    res.status(401).json({
      success: false,
      error: 'Token is not valid'
    });
  }
};

module.exports = auth;
