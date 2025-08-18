import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, unauthorized' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Server error: JWT_SECRET not configured' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = decoded; // Gắn payload vào req.user
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
}