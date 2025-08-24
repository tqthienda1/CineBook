import connection from '../db.js';

const showtime = {
  async addShowtime(showtimeData) {
    const { movieID, roomID, cinemaID, showDate, startTime, endTime } = showtimeData;

    const sqlAdd = `
      INSERT INTO showtime (movieID, roomID, cinemaID, showDate, startTime, endTime)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.promise().execute(sqlAdd, [movieID, roomID, cinemaID, showDate, startTime, endTime]);

    if (!result.affectedRows === 0) {
      return null;
    }

    return {showtimeID: result.insertId, ...showtimeData};
  },

  async getAllShowtime() {
    const sqlGetAllShowtime = `SELECT * FROM showtime`;

    const [rows] = await connection.promise().execute(sqlGetAllShowtime);
    
    return rows;
  },

  async getShowtimeForUser(showtimeData) {
    const { cinemaID, movieID, showDate } = showtimeData
    console.log(showtimeData);
    const sqlGetShowtime = `
      SELECT * 
      FROM showtime
      WHERE cinemaID = ? AND movieID = ? AND DATE(showDate) = ?  
    `;

    const [result] = await connection.promise().execute(sqlGetShowtime, [cinemaID, movieID, showDate]);

    return result.length > 0 ? result : null
  }


}

export default showtime;