import { RiZoomInFill } from 'react-icons/ri';
import connection from '../db.js'

const Room = {
  async addRoom(roomData) {
    const { cinemaID, roomName, capacity, layoutID } = roomData;

    const sqlAddRoom = `
      INSERT INTO room(cinemaID, roomName, capacity, layoutID)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await connection.promise().execute(sqlAddRoom, [cinemaID, roomName, capacity, layoutID]);

    if (result.affectedRows === 0) {
      return null;
    }
    
    return {roomID: result.insertId, ...roomData};
  }, 

  async getRoomByID(roomID) {
    const sqlGetRoom = `
      SELECT *
      FROM room
      WHERE roomID = ?
      `
    ;

    const [result] = await connection.promise().execute(sqlGetRoom, [roomID]);

    if (result.affectedRows === 0) {
      return null;
    }

    return result[0];
  } 
}

export default Room;