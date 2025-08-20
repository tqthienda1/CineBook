import Movie from '../models/Movie.js';
import User from '../models/User.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    const formattedMovies = movies.map(movie => ({
      ...movie,
      releaseDay: new Date(movie.releaseDay).toISOString().split('T')[0]
    }));

    res.json(formattedMovies);
    console.log('Lấy tất cả phim thành công:', formattedMovies);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const addMovie = async (req, res) => {
  try {
    // Logic to add a movie
    const {
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !category ||
      !language ||
      !duration ||
      !releaseDay ||
      !IMDBrating ||
      !description ||
      !directors ||
      !writers ||
      !actors ||
      !ageLimit
    ) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const newMovie = {
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    };

    // Call the model method to add the movie
    const addedMovie = await Movie.createMovie(newMovie);
    if (!addedMovie) {
      return res.status(500).json({ message: 'Không thể thêm phim' });
    }

    // If successful, return the added movie
    res.status(201).json(addedMovie);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Phim đã tồn tại' });
    }
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const editMovie = async (req, res) => {
  try {
    const { movieID } = req.params; // Lấy movieID từ URL (vd: /movies/:movieID)
    const {
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    } = req.body;

    // Validate bắt buộc (tùy bạn muốn strict hay không)
    if (
      !name ||
      !category ||
      !language ||
      !duration ||
      !releaseDay ||
      !IMDBrating ||
      !description ||
      !directors ||
      !writers ||
      !actors ||
      !ageLimit
    ) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const updatedMovieData = {
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    };

    // Gọi model update
    const updatedMovie = await Movie.editMovie(movieID, updatedMovieData);

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Không tìm thấy phim để cập nhật' });
    }

    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { movieID } = req.params; // Lấy movieID từ URL (vd: /movies/:movieID)

    // Gọi model delete
    const result = await Movie.deleteMovie(movieID);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy phim để xóa' });
    }

    res.status(200).json({ message: 'Xóa phim thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}


// Các hàm quản lý account người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
    console.log('Lấy tất cả người dùng thành công:', users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
} 

export const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }
    // Gọi model để tạo người dùng mới
    const newUser = await User.createUser( email, password, role );
    if (!newUser) {
      return res.status(500).json({ message: 'Không thể tạo người dùng mới'
      });
    }
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { userID } = req.params; // Lấy userID từ URL (vd: /users/:userID)
    const { role } = req.body;

    // Validate bắt buộc (tùy bạn muốn strict hay không)  
    if (!role) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    // Gọi model update
    const updateUser = await User.adminUpdateUser(userID, role);
    if (!updateUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để cập nhật hoặc dữ liệu không có thay đổi' });
    }
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params; // Lấy userID từ URL (vd: /users/:userID)

    // Gọi model delete
    const result = await User.deleteUser(userID);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để xóa' });
    }

    res.status(200).json({ message: 'Xóa người dùng thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}
