import connection from '../db.js';

const cinema = {
  async getAllcinemas() {
    const sqlGetAllCinema = 'SELECT * FROM cinema';
    const [rows] = await connection.promise().execute(sqlGetAllCinema);
    return rows;
  },

  async getCinemaById(cinemaID) { 
    const sqlGetCinema = 'SELECT * FROM cinema WHERE cinemaID = ?';

    const [rows] = await connection.promise().execute(sqlGetCinema, [cinemaID]);

    return rows[0] || null; // Trả về rạp chiếu nếu tìm
  },

  async getCinemasByCity(city) {
    const sqlGetCinemasByCity = 'SELECT * FROM cinema WHERE city = ?';
    const [rows] = await connection.promise().execute(sqlGetCinemasByCity, [city]);   

    if (rows.length === 0) {
      return null; // Không tìm thấy rạp chiếu nào trong thành phố này
    }
    return rows; // Trả về danh sách rạp chiếu trong thành phố
  },

  async addCinema(cinemaData) {
    const { cinemaName, address, city, phone } = cinemaData;
    const sqlAddCinema = `
    INSERT INTO cinema (cinemaName, address, city, phone)
    VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await connection.promise().execute(sqlAddCinema, [cinemaName, address, city, phone]);

    if (result.affectedRows === 0) {
      return null; // Không thêm được rạp chiếu
    }
    return { cinemaID: result.insertId, ...cinemaData }; // Trả về thông tin rạp chiếu mới
  },

  async deleteCinema(cinemaID) {
    const sqlDeleteCinema = 'DELETE FROM cinema WHERE cinemaID = ?';
    const [result] = await connection.promise().execute(sqlDeleteCinema, [cinemaID]);

    if (result.affectedRows === 0) {
      return null; // Không tìm thấy rạp chiếu để xóa
    }
    return true; // Xóa thành công
  }, 
  
  async updateCinema(cinemaID, cinemaData) {
    const { cinemaName, address, city, phone } = cinemaData;
    const sqlUpdateCinema = `
      UPDATE cinema
      SET cinemaName = ?, address = ?, city = ?, phone = ?
      WHERE cinemaID = ?
    `;
    
    const [result] = await connection.promise().execute(sqlUpdateCinema, [cinemaName, address, city, phone, cinemaID]);

    if (result.affectedRows === 0) {
      return null; // Không tìm thấy rạp chiếu để cập nhật
    }
    return { cinemaID, ...cinemaData }; // Trả về thông tin rạp chiếu đã cập nhật
  }
  
};

export default cinema;