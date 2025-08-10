import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Thiếu username hoặc password' });
    }

    // const existingUser = await User.findByUsername(username);
    // if (existingUser) {
    //   return res.status(409).json({ message: 'Tên người dùng đã tồn tại' });
    // }

    // const newUser = await User.create({ username, password });

    console.log('Email: ', email);

    return res.status(201).json({ message: 'Đăng ký thành công', email: email });
  } catch {
    console.error('Lỗi khi đăng ký:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
