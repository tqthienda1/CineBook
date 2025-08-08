import User from '../models/User.js';


export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Thiếu username hoặc password' });
  }

  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    return res.status(409).json({ message: 'Tên người dùng đã tồn tại' });
  }

  const newUser = await User.create({ username, password });

  return res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
};
