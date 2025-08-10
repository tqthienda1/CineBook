import connection from '../db.js';
import bcrypt from 'bcryptjs';


const User = {
  // 1. Kiểm tra email đã tồn tại
  async checkEmailExists(email) {
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await connection.promise().query(query, [email]);
    return rows.length > 0;
  },

  // 2. Tạo user mới
  async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
    const [result] = await connection.promise().query(query, [email, hashedPassword]);
    return { id: result.insertId, email };
  },

  // 3. Lấy user theo email
  async getUserByEmail(email) {
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await connection.promise().query(query, [email]);
    return rows[0] || null;
  },

  // 4. So sánh password
  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

};

export default User;
