import connection from '../db.js';

const showtime = {
  async addShowtime(showtimeData) {
    const { movieID, roomID, cinemaID, showDate, startTime, endTime } = showtimeData;

    const sqlAdd = `
      INSERT INTO showtime (movieID, roomID, cinemaID, showDate, startTime, endTime)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection
      .promise()
      .execute(sqlAdd, [movieID, roomID, cinemaID, showDate, startTime, endTime]);

    if (!result.affectedRows === 0) {
      return null;
    }

    return { showtimeID: result.insertId, ...showtimeData };
  },

  async getAllShowtime() {
    const sqlGetAllShowtime = `
      SELECT st.showtimeID, st.movieID, st.roomID, st.cinemaID, st.cinemaID, st.showDate, st.startTime, st.endTime, c.cinemaName, m.name, r.roomName
      FROM showtime st
      JOIN cinema c ON c.cinemaID = st.cinemaID
      JOIN movie m ON m.movieID = st.movieID
      JOIN room r ON r.roomID = st.roomID
      `;

    const [rows] = await connection.promise().execute(sqlGetAllShowtime);

    return rows;
  },

  async getShowtimeForUser(showtimeData) {
    const { cinemaID, movieID, showDate } = showtimeData;

    const sqlGetShowtime = `
      SELECT * 
      FROM showtime
      WHERE cinemaID = ? AND movieID = ? AND DATE(showDate) = ?  
    `;
    
    const [result] = await connection.promise().execute(sqlGetShowtime, [cinemaID, movieID, showDate]);
    console.log(result)
    return result.length > 0 ? result : null;
  },

  async getShowtimeByRoomID(roomID) {
    const sql = `
      SELECT *
      FROM showtime
      WHERE roomID = ?
    `;

    const [result] = await connection.promise().execute(sql, [roomID]);
    console.log(result);

    return result;
  },

  async deleteShowtime(showtimeID) {
    const sqlDelete = `
      DELETE 
      FROM showtime
      WHERE showtimeID = ?
    `;

    const [result] = await connection.promise().execute(sqlDelete, [showtimeID]);

    if (result.affectedRows === 0) {
      return null;
    }

    return showtimeID;
  },

  async updateShowtime(showtimeData) {
    const { showtimeID, movieID, roomID, cinemaID, showDate, startTime, endTime } = showtimeData;

    const sqlUpdate = `
      UPDATE showtime
      SET movieID = ?,
          roomID = ?,
          cinemaID = ?,
          showDate = ?,
          startTime = ?,
          endTime = ?
      WHERE showtimeID = ?
    `;

    const [result] = await connection
      .promise()
      .execute(sqlUpdate, [movieID, roomID, cinemaID, showDate, startTime, endTime, showtimeID]);

    if (result.affectedRows === 0) {
      return null;
    }

    return showtimeData;
  },
};

export default showtime;
