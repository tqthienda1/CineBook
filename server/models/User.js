import connection from '../db.js';
import bcrypt from 'bcryptjs';

// Hàm kiểm tra email tồn tại
const checkEmailExists = async (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE username = ?';
    connection.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0);
    });
  });
};

// Hàm tạo user mới
const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
    connection.query(query, [email, hashedPassword], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};

// Export default dưới dạng object
export default {
  checkEmailExists,
  createUser
};
