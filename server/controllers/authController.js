import User from '../models/User.js';
import jwt from 'jsonwebtoken';
export const registerUser = async (req, res) => {
  try{  
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Thiếu email hoặc password' });
    }

    const existingUser = await User.checkEmailExists(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã được đăng kí' });
    }

    const newUser = await User.createUser( email, password );

    return res.status(201).json({ message: 'Đăng ký thành công', email: email });
  } catch (err) {
    console.error("Lỗi khi đăng ký:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Thiếu email hoặc password' });
    }

    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(409).json({ message: 'Email không tồn tại' });
    }

    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }
    console.log(user.userID)
    console.log(user.email)
    console.log(user.role)
    const token = jwt.sign(
      { id: user.userID, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Đăng nhập thành công', token });
    
  } catch (err) {
    console.error("Lỗi khi đăng nhập:", err);
    res.status(500).json({ message: 'Server error' });
  }
}

