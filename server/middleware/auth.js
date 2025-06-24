import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication invalid' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret');
    
    // Add user info to request object
    req.user = { userId: decoded.userId, name: decoded.name };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ success: false, message: 'Authentication invalid' });
  }
};