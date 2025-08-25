import Movie from '../models/Movie.js';
import User from '../models/User.js';
import Cinema from '../models/Cinema.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    const formattedMovies = movies.map((movie) => ({
      ...movie,
      releaseDay: new Date(movie.releaseDay).toISOString().split('T')[0],
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
      posterURL,
      backdropURL,
      trailerURL,
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
      posterURL,
      backdropURL,
      trailerURL,
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
    res.status(500).json({ message: 'Lỗi server', error: err });
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
      posterURL,
      backdropURL,
      trailerURL,
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
      posterURL,
      backdropURL,
      trailerURL,
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
};

// Các hàm quản lý account người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }
    // Gọi model để tạo người dùng mới
    const newUser = await User.createUser(email, password, role);
    if (!newUser) {
      return res.status(500).json({ message: 'Không thể tạo người dùng mới' });
    }
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
};

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
};

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
};

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
};

export const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.getAllcinemas();
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const getCinemaById = async (req, res) => {
  try {
    const { cinemaID } = req.params;
    const cinema = await Cinema.getCinemaById(cinemaID);

    if (!cinema) {
      return res.status(404).json({ message: 'Rạp chiếu không tồn tại' });
    }

    res.json(cinema);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

export const updateCinema = async (req, res) => {
  try {
    const { cinemaID } = req.params;
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
};

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
};

// Quản lý layout

import Layout from '../models/Layout.js';
import Seat from '../models/Seat.js';

export const getAllLayouts = async (req, res) => {
  try {
    const layouts = await Layout.getAllLayout();

    const layoutsWithSeats = await Promise.all(
      layouts.map(async (l) => {
        const seats = await Seat.getSeatsByLayoutID(l.layoutID);
        return {
          ...l,
          seats: seats,
        };
      }),
    );

    res.json(layoutsWithSeats);
  } catch (err) {
    console.error('Lỗi khi lấy tất cả layout:', err);
    res.status(500).json({ message: 'Lỗi khi lấy tất cả layout' });
  }
};

function generateSeatIDs(seats) {
  const seatList = [];
  let emptyRow = 0; // đếm số hàng trống
  seats.forEach((rowSeats, rowIndex) => {
    let colCount = 1; 
  
    const rowLetter = String.fromCharCode(65 + rowIndex - emptyRow); // 65 = 'A' 
    
    rowSeats.forEach((seat) => {
      let seatID = null;

      if (seat.type !== 'path') {
        if (seat.type == 'regular') {
          seatID = `${rowLetter}${colCount}`;
          colCount++;
        }

        if (seat.type == "coupleLeft") {
          seatID = `${rowLetter}${colCount}`;
        }
        if (seat.type == "coupleRight") {
          seatID = `${rowLetter}${colCount}`;
          colCount++;

        }
      } else {
        seatID = null;
      }
      seatList.push({
        seatID, // null nếu là path
        rowNum: seat.rowNum,
        colNum: seat.colNum,
        type: seat.type,
        status: 'available',
        price: seat.price,
      });
    });

    if (colCount === 1) {
      emptyRow++;
    }
  });

  return seatList;
}

export const addLayoutWithSeats = async (req, res) => {
  try {
    const { numRow, numCol, seats } = req.body;

    if (!numRow || !numCol || !seats) {
      return res.status(400).json({ message: 'Thiếu dữ liệu layout' });
    }

    const layoutData = { numRow, numCol };

    // 1. Tạo layout mới
    const layout = await Layout.addLayout(layoutData);

    const seatList = generateSeatIDs(seats).map((seat) => ({
      layoutID: layout.layoutID,
      ...seat,
    }));

    // 3. Insert tất cả seats
    if (seatList.length > 0) {
      await Seat.addSeat(seatList);
    }

    res.status(201).json({
      message: 'Tạo layout & seats thành công',
      layoutID: layout.layoutID,
    });
  } catch (error) {
    console.error('Lỗi khi tạo layout:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo layout' });
  }
};

export const getLayoutWithSeats = async (req, res) => {
  try {
    const { layoutID } = req.params;

    if (!layoutID) {
      return res.status(400).json({ message: 'Thiếu layoutID' });
    }

    const layout = await Layout.getLayoutById(layoutID);
    if (!layout) {
      return res.status(404).json({ message: 'Không tìm thấy layout' });
    }

    const seats = await Seat.getSeatsByLayoutID(layoutID);

    res.status(200).json({
      layout,
      seats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy layout và seats', error });
  }
};

export const getLayoutWithSeatsByRoomID = async (req, res) => {
  try {
    const { roomID } = req.params;
    console.log(roomID);

    if (!roomID) {
      return res.status(400).json({ message: 'Thiếu roomID' });
    }

    const layoutID = await Layout.getLayoutIDByRoomID(roomID);

    if (!layoutID) {
      return res.status(400).json({ message: 'Không tìm thấy layout' });
    }

    const layout = await Layout.getLayoutById(layoutID);
    if (!layout) {
      return res.status(404).json({ message: 'Không tìm thấy layout' });
    }

    const seats = await Seat.getSeatsByLayoutID(layoutID);

    res.status(200).json({
      layout,
      seats,
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm layout bằng roomID', error: err });
  }
};

export const deleteLayoutWithSeats = async (req, res) => {
  try {
    const { layoutID } = req.params;

    if (!layoutID) {
      return res.status(400).json({ message: 'Thiếu layoutID' });
    }

    const seats = await Seat.deleteSeatsByLayoutID(layoutID);

    if (!seats) {
      return res.status(404).json({ message: 'Không tìm thấy ghế để xóa' });
    }

    const layout = await Layout.deleteLayout(layoutID);

    if (!layout) {
      return res.status(404).json({ message: 'Không tìm thấy layout để xóa' });
    }

    res.status(200).json({ message: 'Xóa thành công layout và ghế' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa layout và ghế', err });
  }
};

export const updateLayoutWithSeats = async (req, res) => {
  try {
    const { layoutID } = req.params;

    if (!layoutID) {
      return res.status(400).json({ message: 'Thiếu layoutID' });
    }

    const { numRow, numCol, seats } = req.body;

    if (!numRow || !numCol || !seats) {
      return res.status(400).json({ message: 'Thiếu dữ liệu layout' });
    }

    const layoutData = { layoutID, numRow, numCol };
    const updatedLayout = await Layout.updateLayout(layoutData);

    if (!updatedLayout) {
      return res.status(404).json({ message: 'Không tìm thấy layout để cập nhật' });
    }

    const deleteSeat = await Seat.deleteSeatsByLayoutID(layoutID);

    const seatList = generateSeatIDs(seats).map((seat) => ({
      layoutID: layoutID,
      ...seat,
    }));

    // 3. Insert tất cả seats
    if (seatList.length > 0) {
      await Seat.addSeat(seatList);
    }

    res.status(200).json({ layoutData, seatList });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo cập nhật layout và ghế', error: err });
  }
};

// ------------------------------------------- ROOM
import Room from '../models/Room.js';

export const addRoom = async (req, res) => {
  try {
    const { cinemaID, roomName, capacity, layoutID } = req.body;

    if (!cinemaID || !roomName || !capacity || !layoutID) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
    }

    const roomData = { cinemaID, roomName, capacity, layoutID };
    const addedRoom = await Room.addRoom(roomData);

    if (!addedRoom) {
      return res.status(400).json({ message: 'Không thể thêm phòng chiếu' });
    }

    res.status(200).json(addedRoom);
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: 'cinemaID không tồn tại trong bảng cinema. Vui lòng tạo cinema trước khi thêm room.',
      });
    }
    res.status(500).json({ message: 'Lỗi khi thêm phòng chiếu', error: err });
  }
};

export const getRoomByID = async (req, res) => {
  try {
    const { roomID } = req.params;

    if (!roomID) {
      return res.status(400).json({ message: 'Thiếu roomID' });
    }

    const room = await Room.getRoomByID(roomID);

    if (!room) {
      return res.status(400).json({ message: 'Không tìm được phòng chiếu' });
    }

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm phòng chiếu', error: err });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomID } = req.params;

    if (!roomID) {
      return res.status(400).json({ message: 'Thiếu roomID' });
    }

    const room = await Room.deleteRoom(roomID);

    if (!room) {
      return res.status(400).json({ message: 'Không tìm thấy phòng chiếu cần xóa' });
    }

    res.status(200).json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa phòng chiếu', error: err });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { roomID } = req.params;

    if (!roomID) {
      return res.status(400).json({ message: 'Thiếu roomID' });
    }

    const { cinemaID, roomName, capacity, layoutID } = req.body;
    const roomData = { roomID, cinemaID, roomName, capacity, layoutID };

    const room = await Room.updateRoom(roomData);

    if (!room) {
      return res.status(400).json({ message: 'Không tìm thấy phòng chiếu cần cập nhật ' });
    }

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật phòng chiếu', error: err });
  }
};

export const getAllRoom = async (req, res) => {
  try {
    const rooms = await Room.getAllRoom();

    res.status(200).json(rooms);
  } catch {
    res.status(500).json({ message: 'Lỗi khi lấy tất cả các phòng chiếu', error: err });
  }
};

// ---------------------------SHOWTIME
import Showtime from '../models/Showtime.js';

export const addShowtime = async (req, res) => {
  try {
    const { movieID, roomID, cinemaID, showDate, startTime, endTime } = req.body;

    if (!movieID || !roomID || !cinemaID || !showDate || !startTime || !endTime) {
      return res.status(400).json({ message: 'Chưa điền đủ thông tin bắt buộc' });
    }

    const showtimeData = { movieID, roomID, cinemaID, showDate, startTime, endTime };

    const showtime = await Showtime.addShowtime(showtimeData);

    if (!showtime) {
      return res.status(400).json({ message: 'Không thể thêm suất chiếu' });
    }

    res.status(200).json(showtime);
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: 'roomID hoặc movieID hoặc cinemaID không tồn tại trong cơ sở dữ liệu',
        error: err.sqlMessage,
      });
    }
    res.status(500).json({ message: 'Lỗi khi thêm suất chiếu', error: err });
  }
};

export const getAllShowtime = async (req, res) => {
  try {
    let showtimeList = await Showtime.getAllShowtime();

    showtimeList = showtimeList.map((st) => ({
      ...st,
      showDate: new Date(st.showDate).toISOString().split('T')[0], // format yyyy-mm-dd
    }));

    res.status(200).json(showtimeList);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy tất cả suất chiếu', error: err });
  }
};

export const getShowtimeByRoomID = async (req, res) => {
  try {
    const { roomID } = req.params;

    if (!roomID) {
      return res.status(400).json({ message: 'Thiếu roomID' });
    }

    let showtimes = await Showtime.getShowtimeByRoomID(roomID);

    if (!showtimes || showtimes.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu cho phòng này' });
    }

    showtimes = showtimes.map((st) => ({
      ...st,
      showDate: new Date(st.showDate).toISOString().split('T')[0],
    }));

    res.status(200).json(showtimes);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy suất chiếu theo roomID', error: err });
  }
};

export const deleteShowtime = async (req, res) => {
  try {
    const { showtimeID } = req.params;
    console.log(showtimeID);
    if (!showtimeID) {
      return res.status(400).json({ message: 'Thiếu showtimeID' });
    }

    const showtime = await Showtime.deleteShowtime(showtimeID);

    if (!showtime) {
      return res.status(400).json({ message: 'Không tìm thấy suất chiếu để xóa' });
    }

    res.status(200).json({ message: 'Xóa suất chiếu thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa suất chiếu', error: err });
  }
};

export const updateShowtime = async (req, res) => {
  try {
    const { showtimeID } = req.params;
    const { movieID, roomID, cinemaID, showDate, startTime, endTime } = req.body;

    if (!showtimeID) {
      return res.status(400).json({ message: 'Thiếu showtimeID' });
    }
    if (!movieID || !roomID || !cinemaID || !showDate || !startTime || !endTime) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const showtimeData = { showtimeID, movieID, roomID, cinemaID, showDate, startTime, endTime };
    const updatedShowtime = await Showtime.updateShowtime(showtimeData);

    if (!updatedShowtime) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu để cập nhật' });
    }

    if (updatedShowtime) {
      updatedShowtime.showDate = new Date(updatedShowtime.showDate).toISOString().split('T')[0];
    }

    res.status(200).json(updatedShowtime);
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: 'roomID hoặc movieID hoặc cinemaID không tồn tại trong cơ sở dữ liệu',
        error: err.sqlMessage,
      });
    }
    res.status(500).json({ message: 'Lỗi khi cập nhật suất chiếu', error: err });
  }
};
