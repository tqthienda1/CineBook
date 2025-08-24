import connection from '../db.js';

const layout = {
  async getLayoutById(layoutID) {
  
    const sqlGetLayoutById = `SELECT * FROM layout WHERE layoutID = ?`
    
    const [rows] = await connection.promise().execute(sqlGetLayoutById, [layoutID]);

    return rows[0] || null;
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
  }
} 


export default layout;