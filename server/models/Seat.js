import connection from '../db.js';

const seat = {
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
  }
};


export default seat;