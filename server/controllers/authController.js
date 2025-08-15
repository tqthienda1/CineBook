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

    // console.log("Username: ", email)
    // console.log("Password: ", password)

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

    const existingUser = await User.checkEmailExists(email);
    if (!existingUser) {
      return res.status(409).json({ message: 'Email không tồn tại' });
    }

    const user = await User.getUserByEmail(email)
    const hashed = user.password
    const isPasswordValid = await User.comparePassword(password, hashed);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      token
    });
  } catch (err) {
    console.error("Lỗi khi đăng nhập:", err);
    res.status(500).json({ message: 'Server error' });
  }
}

