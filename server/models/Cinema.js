import connection from '../db.js';

const cinema = {
  async getAllcinemas() {
    return new Promise((resolve, reject) => { 
      connection.query('SELECT * FROM cinema', (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
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
  }
};

export default cinema;