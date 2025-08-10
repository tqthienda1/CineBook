import mysql from 'mysql2';
import 'dotenv/config'; 
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
});

connection.connect((err) => {
  if (err) throw err;

  connection.query('CREATE DATABASE IF NOT EXISTS cinebook', (err) => {
    if (err) throw err;

    // Chọn database
    connection.changeUser({ database: 'cinebook' }, (err) => {
      if (err) throw err;

      // Tạo bảng user
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
  });
});

export default connection;
