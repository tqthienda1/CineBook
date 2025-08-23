import connection from '../db.js';

const seat = {
    async addSeat(seatList) {
      const sqlAddSeat = `
      INSERT INTO seat (seatID, layoutID, numRow, numCol, status, type, price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    for (const seatData of seatList) {
      const { seatID, layoutID, numRow, numCol, status, type, price } = seatData;
      console.log(seatData)
      // // Nếu seatID chưa có thì cho NULL
      // const safeSeatID = seatID !== undefined ? seatID : null;

        await connection.promise().execute(sqlAddSeat, [
        seatID,
        layoutID,
        numRow,
        numCol,
        status,
        type,
        price,
      ]);
    }

    return { seatList };
  }
};

seat.addSeat = async function (seatList) {
  
};

export default seat;