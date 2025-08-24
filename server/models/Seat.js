import connection from '../db.js';

const seat = {
  async getSeatsByLayoutID(layoutID) {
    const sqlGetSeats = `SELECT * FROM seat WHERE layoutID = ?`;

    const [rows] = await connection.promise().execute(sqlGetSeats, [layoutID]);

    return rows;
  },

  async addSeat(seatList) {
    const sqlAddSeat = `
    INSERT INTO seat (seatID, layoutID, rowNum, colNum, status, type, price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    for (const seatData of seatList) {
      const { seatID, layoutID, rowNum, colNum, status, type, price } = seatData;
      await connection.promise().execute(sqlAddSeat, [
        seatID,
        layoutID,
        rowNum,
        colNum,
        status,
        type,
        price,
      ]);
    }

    return { seatList };
  },

  async deleteSeatsByLayoutID(layoutID) {
    const sqlDeleteSeat = `DELETE FROM seat WHERE layoutID = ? `

    const [rows] = await connection.promise().execute(sqlDeleteSeat, [layoutID]);

    if (rows.affectedRows === 0) {
      return null;
    }

    return true;
  }
};


export default seat;