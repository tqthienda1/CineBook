// db.js
import mysql from 'mysql2';

// 1. Kết nối MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cinebook'
});

// 2. Mở kết nối
connection.connect((err) => {
  if (err) {
    console.error('❌ Kết nối MySQL thất bại:', err);
    return;
  }
  console.log('✅ Đã kết nối MySQL.');

  // 3. Tạo bảng nếu chưa tồn tại
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('❌ Lỗi tạo bảng:', err);
      return;
    }
    console.log('✅ Bảng "user" đã sẵn sàng.');
  });
});

export default connection;
