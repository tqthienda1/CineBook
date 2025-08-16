import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
  const authHeader = req.header['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // lấy sau "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'No token, unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // gắn payload vào req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}