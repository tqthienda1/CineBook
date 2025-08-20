import User from '../models/User.js'
// import Movie from '../models/Movie'

export const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.user.id); // req.user lấy từ middleware auth
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, password, fullname, phone, birthday } = req.body;
    const userId = req.user.id; // req.user lấy từ middleware auth

    if (!email && !password && !fullname && !phone && !birthday) {
      return res.status(400).json({ message: 'Không có thông tin nào để cập nhật' });
    }

    const updatedUser = await User.userUpdateUser(userId, fullname, phone, birthday);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user để cập nhật hoặc thông tin không có thay đổi' });
    }

    res.json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
}


