import Movie from '../models/Movie.js';

export const getMovies = async (req, res) => {
  try {
    console.log(1)
    const movies = await Movie.getAllMovies();
    res.json(movies);
    console.log('Lấy tất cả phim thành công:', movies);
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
