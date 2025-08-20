import connection from '../db.js';
import bcrypt from 'bcryptjs';

const User = {
  // Kiểm tra email đã tồn tại
  async checkEmailExists(email) {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await connection.promise().execute(sql, [email]);
    return rows.length > 0;
  },

  // Tạo user mới
  async createUser(email, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO user (email, password, role) VALUES (?, ?, ?)';
    const [result] = await connection.promise().execute(sql, [email, hashedPassword, role]);
    return { id: result.insertId, email, role };
  },

  // Lấy user theo email
  async getUserByEmail(email) {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await connection.promise().execute(sql, [email]);
    return rows[0] || null;
  },

  // Lấy user theo id
  async getUserById(id) {
    const sql = 'SELECT * FROM user WHERE userID = ?';
    const [rows] = await connection.promise().execute(sql, [id]);
    return rows[0] || null;
  },

  // So sánh password
  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  async getAllUsers() {
    const sql = 'SELECT * FROM user';
    const [rows] = await connection.promise().execute(sql);
    return rows;
  },

  async adminUpdateUser(userID, role) {
    const sql = ` UPDATE user 
                  SET role = ? 
                  WHERE userID = ?
                `;

    const [result] = await connection.promise().execute(sql, [role, userID]);
    if (result.affectedRows === 0) {
      return null; // Không tìm thấy người dùng để cập nhật
    }
    // Truy vấn lại user sau khi cập nhật
    const sqlSelect = 'SELECT * FROM user WHERE userID = ?';
    const [rows] = await connection.promise().execute(sqlSelect, [userID]);
    return rows[0] || null;
  },

  async deleteUser(userID) {
    const sql = 'DELETE FROM user WHERE userID = ?';
    const [result] = await connection.promise().execute(sql, [userID]);
    return result; // Trả về kết quả xóa
  }

};

export default User;
