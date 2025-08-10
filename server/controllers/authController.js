  import User from '../models/User.js';

  export const registerUser = async (req, res) => {
    try{  const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Thiếu email hoặc password' });
      }

      const existingUser = await User.checkEmailExists(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email đã được đăng kí' });
      }

      const newUser = await User.createUser( email, password );x

      // console.log("Username: ", email)
      // console.log("Password: ", password)

      return res.status(201).json({ message: 'Đăng ký thành công', email: email });
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err);
      res.status(500).json({ message: 'Server error' });
    }
  };
