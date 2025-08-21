import connection from '../db.js';

const cinema = {
  async getAllcinemas() {
    const sqlGetAllCinema = 'SELECT * FROM cinema';
    const [rows] = await connection.promise().execute(sqlGetAllCinema);
    return rows;
  },

  async addCinema(cinemaData) {
    const { cinemaName, address, city, phone } = cinemaData;
    console.log('Adding cinema:', cinemaData);
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

  async getCinemaById(cinemaID) { 
    const sqlGetCinema = 'SELECT * FROM cinema WHERE cinemaID = ?';

    const [rows] = await connection.promise().execute(sqlGetCinema, [cinemaID]);

    return rows[0] || null; // Trả về rạp chiếu nếu tìm
  }
};

export default cinema;