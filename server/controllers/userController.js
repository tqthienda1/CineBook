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
    const { email, fullname, phone, birthday, favoriteCinema } = req.body;
    const userId = req.user.id; // req.user lấy từ middleware auth

    if (!email && !fullname && !phone && !birthday && !favoriteCinema) {
      return res.status(400).json({ message: 'Không có thông tin nào để cập nhật' });
    }

    const updatedUser = await User.userUpdateUser(userId, fullname, phone, birthday, favoriteCinema);

    if (updatedUser.birthday) {
      updatedUser.birthday = new Date(updatedUser.birthday).toISOString().split('T')[0];
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user để cập nhật hoặc thông tin không có thay đổi' });
    }

    res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: 'roomID hoặc movieID hoặc cinemaID không tồn tại trong cơ sở dữ liệu',
        error: error.sqlMessage,
      });
    }
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const addFavoriteCinema = async (req, res) => {
  try {
    const userID = req.user.id;
    const { favoriteCinema } = req.body;
    console.log(userID, favoriteCinema);
    if (!favoriteCinema) {
      return res.status(400).json({ message: 'Không có thông tin rạp yêu thích' });
    }

    const updatedUser = await User.addFavoriteCinema(userID, favoriteCinema);

    if (updatedUser.birthday) {
      updatedUser.birthday = new Date(updatedUser.birthday).toISOString().split('T')[0];
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user để cập nhật hoặc thông tin không có thay đổi' });
    }

    res.status(200).json({ message: 'Cập nhật thành công rạp yêu thích' });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: 'roomID hoặc movieID hoặc cinemaID không tồn tại trong cơ sở dữ liệu',
        error: error.sqlMessage,
      });
    }
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// ---------------------- MOVIE
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

export const getMovieByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      const movie = getMovies();
      res.status(200).json(movie);
    }

    const movies = await Movie.getMovieByName(name);

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy phim nào với tên đã cho' });
    }

    const formattedMovies = movies.map((movie) => {
      if (movie.releaseDay) {
        movie.releaseDay = new Date(movie.releaseDay).toISOString().split('T')[0];
      }
      return movie;
    });

    res.status(200).json(formattedMovies);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// ------------------------------------------ SHOWTIME
import Showtime from '../models/Showtime.js';

export const getShowtimeForUser = async (req, res) => {
  try {
    const { movieID, cinemaID, showDate } = req.query;

    if (!movieID || !cinemaID || !showDate) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const showtimeData = { movieID, cinemaID, showDate };
    let showtime = await Showtime.getShowtimeForUser(showtimeData);
 
    showtime = showtime.map((st) => ({
      ...st,
      showDate: new Date(st.showDate).toISOString().split('T')[0],
    }));

    res.status(200).json(showtime);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm suất chiếu', error: err });
  }
};
