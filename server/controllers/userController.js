import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Cinema from '../models/Cinema.js';

export const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.user.id); // req.user lấy từ middleware auth
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    if (user.birthday) {
      user.birthday = new Date(user.birthday).toISOString().split('T')[0];
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, fullname, phone, birthday } = req.body;
    const userId = req.user.id; // req.user lấy từ middleware auth

    if (!email && !fullname && !phone && !birthday) {
      return res.status(400).json({ message: 'Không có thông tin nào để cập nhật' });
    }

    const updatedUser = await User.userUpdateUser(userId, fullname, phone, birthday);

    if (updatedUser.birthday) {
      updatedUser.birthday = new Date(updatedUser.birthday).toISOString().split('T')[0];
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user để cập nhật hoặc thông tin không có thay đổi' });
    }

    res.json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const getMovieWithCities = async (req, res) => {
  try {
    const movieID = req.params.id;

    const movie = await Movie.getMovieByID(movieID);

    if (!movie) {
      return res.status(404).json({ message: 'Không tìm thấy phim' });
    }

    if (movie.releaseDay) {
      movie.releaseDay = new Date(movie.releaseDay).toISOString().split('T')[0];
    }

    let response = { movie };

    // lấy thông tin thành phố
    const { city } = req.query;
    console.log(city);

    if (city !== 'undefined') {
      const cinema = await Cinema.getCinemasByCity(city);

      if (!cinema) {
        return res.status(404).json({ message: 'Không tìm thấy rạp phim nào trong thành phố này' });
      }
      if (cinema.releaseDay) {
        cinema.releaseDay = new Date(cinema.releaseDay).toISOString().split('T')[0];
      }
      response.cinema = cinema;
    } else {
      const cities = await Movie.getAllCity();
      if (!cities || cities.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy thành phố nào' });
      }
      const citiesMap = cities.map((c) => c.city);

      response.cities = citiesMap;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};
