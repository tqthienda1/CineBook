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
  }
};

export default User;
