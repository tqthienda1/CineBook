import User from '../models/User.js'
// import Movie from '../models/Movie'

export const getProfile = async (req, res) => {
  try {
    const user = await User.getUserById(req.user.id); // req.user lấy từ middleware auth
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }
    console.log('lấy profile thành công');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, phone, birthday } = req.body;
//     const userId = req.user.id; // req.user lấy từ middleware auth

//     if (!fullname && !phone && !birthday) {
//       return res.status(400).json({ message: 'Không có thông tin nào để cập nhật' });
//     }

//     const updatedUser = await User.updateUserProfile(userId, fullname, phone, birthday);
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'Không tìm thấy user để cập nhật' });
//     }

//     console.log('cập nhật profile thành công');
//     res.json({ message: 'Cập nhật thành công', user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi server', error });
//   }
// }


