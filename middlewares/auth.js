const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    if (token.split('.').length === 3) {
      // Treat as JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      req.user = user;
      return next();
    } else if (token === process.env.ADMIN_API_KEY) {
      // Treat as internal API key
      req.user = {
        role: 'InternalService',
        name: 'InternalService',
        email: 'apikey@internal.dev',
      };
      return next();
    } else {
      return res.status(403).json({ error: 'Invalid Bearer token format' });
    }
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
