import jwt from 'jsonwebtoken';

export function checkAdmin (req, res, next) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: 'Access denied. No user role found.' });
  }

  // Kiểm tra xem người dùng có phải là admin không
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  next();
}