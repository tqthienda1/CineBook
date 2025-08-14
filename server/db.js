import mysql from 'mysql2';
import 'dotenv/config'; 

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'containers-us-west-123.railway.app',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'abcdef123456',
  database: process.env.DB_NAME || 'railway'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Đã kết nối MySQL Railway');

  // Tạo bảng user (nếu chưa có)
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS user (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('Bảng "user" đã sẵn sàng.');
  });
});

export default connection;
