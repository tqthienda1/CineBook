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

