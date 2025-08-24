import Movie from '../models/Movie.js';
import User from '../models/User.js';
import Cinema from '../models/Cinema.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    const formattedMovies = movies.map(movie => ({
      ...movie,
      releaseDay: new Date(movie.releaseDay).toISOString().split('T')[0]
    }));

    res.json(formattedMovies);

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
      trailerURL
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
      trailerURL
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
      trailerURL
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
      trailerURL
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

export const addCinema = async (req, res) => {
  try {
    const { cinemaName, address, phone, city } = req.body;
    
    // Validate required fields
    if (!cinemaName || !address || !phone || !city) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }
    const cinemaData = { cinemaName, address, phone, city }; 
    
    // Gọi model để thêm rạp chiếu mới
    const newCinema = await Cinema.addCinema(cinemaData);
    if (!newCinema) {
      return res.status(500).json({ message: 'Không thể thêm rạp chiếu mới' });
    }

    res.status(201).json(newCinema);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Rạp chiếu đã tồn tại' });
    }
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}

export const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.getAllcinemas();
    res.json(cinemas);

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
}

export const getCinemaById = async (req, res) => {
  try {
    const { cinemaID } = req.params; // Lấy cinemaID từ URL (vd: /cinemas/:cinemaID)
    const cinema = await Cinema.getCinemaById(cinemaID);
    
    if (!cinema) {
      return res.status(404).json({ message: 'Rạp chiếu không tồn tại' });
    }

    res.json(cinema);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
}

export const updateCinema = async (req, res) => {
  try {
    const { cinemaID } = req.params; // Lấy cinemaID từ URL (vd: /cinemas/:cinemaID)
    const { cinemaName, address, phone, city } = req.body;

    if (!cinemaName || !address || !phone || !city) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const updatedCinemaData = { cinemaName, address, phone, city };

    // Gọi model update
    const updatedCinema = await Cinema.updateCinema(cinemaID, updatedCinemaData);
    
    if (!updatedCinema) {
      return res.status(404).json({ message: 'Không tìm thấy rạp chiếu để cập nhật' });
    }

    res.status(200).json(updatedCinema);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}

export const deleteCinema = async (req, res) => {
  try {
    const { cinemaID } = req.params; // Lấy cinemaID từ URL (vd: /cinemas/:cinemaID)

    // Gọi model delete
    const result = await Cinema.deleteCinema(cinemaID);

    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy rạp chiếu để xóa' });
    }

    res.status(200).json({ message: 'Xóa rạp chiếu thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}


// Quản lý layout

import Layout from "../models/Layout.js";
import Seat from "../models/Seat.js";

function generateSeatIDs(seats) {
  const seatList = [];
  let emptyRow = 0; // đếm số hàng trống
  seats.forEach((rowSeats, rowIndex) => {
    let colCount = 1; 
    let couple = 0;
    
    const rowLetter = String.fromCharCode(65 + rowIndex - emptyRow); // 65 = 'A' 
    
    rowSeats.forEach((seat) => {
      let seatID = null;

      if (seat.type !== "path") {
        if (seat.type == "regular") {
          seatID = `${rowLetter}${colCount}`;
          colCount++;
        }
        if (seat.type == "couple") {
          seatID = `${rowLetter}${colCount}`;

          if(couple === 0) {
            couple = 1;
          } else {
            colCount++;
            couple = 0;
          }
        }
      } else {
        seatID = null;
      }
      seatList.push({
        seatID,              // null nếu là path
        rowNum: seat.rowNum,
        colNum: seat.colNum,
        type: seat.type,
        status: 'available',
        price: seat.price,
      });

    });

    if(colCount === 1) {
      emptyRow++;
    }
  });

  return seatList;
}

export const addLayoutWithSeats = async (req, res) => {
  try {
    const { numRow, numCol, seats } = req.body;
    
    if (!numRow || !numCol || !seats) {
      return res.status(400).json({ message: "Thiếu dữ liệu layout" });
    }

    const layoutData = { numRow, numCol };

    // 1. Tạo layout mới
    const layout = await Layout.addLayout(layoutData);

    const seatList = generateSeatIDs(seats).map(seat => ({ 
      layoutID: layout.layoutID,  
      ...seat
    }));

    // 3. Insert tất cả seats
    if (seatList.length > 0) {
      await Seat.addSeat(seatList);
    }

    res.status(201).json({
      message: "Tạo layout & seats thành công",
      layoutID: layout.layoutID
    });
  } catch (error) {
    console.error("Lỗi khi tạo layout:", error);
    res.status(500).json({ message: "Lỗi server khi tạo layout" });
  }
};
