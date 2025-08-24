import connection from '../db.js';

const layout = {

  async getAllLayout() {
    const sqlGetAllLayout = `SELECT * FROM layout`;

    const [rows] = await connection.promise().execute(sqlGetAllLayout);

    return rows;
  },

  async getLayoutById(layoutID) {
    const sqlGetLayoutById = `SELECT * FROM layout WHERE layoutID = ?`
    
    const [rows] = await connection.promise().execute(sqlGetLayoutById, [layoutID]);

    return rows[0] || null;
  },

  async getLayoutIDByRoomID(roomID) {
    const sqlGet = `
      SELECT layoutID
      FROM room
      WHERE roomID = ?
    `

    const [result] = await connection.promise().execute(sqlGet, [roomID]);
   
    if (result.affectedRows === 0) {
      return null;
    }

    return result[0].layoutID;
  },

  async addLayout(layoutData) {
    const { numRow, numCol } = layoutData;
    const sqlAddLayout = `
    INSERT INTO layout (numRow, numCol)
    VALUES (?, ?)
    `;
    
    const [result] = await connection.promise().execute(sqlAddLayout, [numRow, numCol]);

    if (result.affectedRows === 0) {
      return null; // Không thêm được layout
    }
    return { layoutID: result.insertId, ...layoutData }; // Trả về thông tin layout mới
  }, 

  async deleteLayout(layoutID) {
    const sqlDeleteLayout = 'DELETE FROM layout WHERE layoutID = ?';

    const [result] = await connection.promise().execute(sqlDeleteLayout, [layoutID]);

    if(result.affectedRows === 0) {
      return null;
    }

    return layoutID;
  },

  async updateLayout(layoutData) {
    const { layoutID, numRow, numCol } = layoutData;

    const sqlUpdateLayout = `
      UPDATE layout
      SET numRow = ?, numCol = ?
      WHERE layoutID = ?
    `;

    const [result] = await connection.promise().execute(sqlUpdateLayout, [numRow, numCol, layoutID])

    if (result.affectedRows === 0) {
      return null;
    }

    return {layoutData}
  }
} 


export default layout;