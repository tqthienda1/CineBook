import mysql from 'mysql2';
import 'dotenv/config'; 

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'trolley.proxy.rlwy.net',
  port: process.env.DB_PORT || 56881,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'railway'
});

connection.connect(async (err) => {
  if (err) {
    console.error('❌ Lỗi kết nối MySQL:', err.message);
    process.exit(1);
  }
  console.log('✅ Đã kết nối MySQL Railway');

  // const dropTables = [
  //   'movie_category',
  //   'category',
  //   'movie',
  //   'user'
  // ];

  // for (const table of dropTables) {
  //   await new Promise((resolve) => {
  //     connection.query(`DROP TABLE IF EXISTS ${table}`, () => resolve());
  //   });
  // }
  // console.log('🗑️ Đã xóa các bảng cũ');

  const tables = [
    {
      name: 'user',
      sql: `
        CREATE TABLE IF NOT EXISTS user (
          user_id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          birthday DATE,
          role varchar(10)
        )
      `
    },
    {
      name: 'movie',
      sql: `
        CREATE TABLE IF NOT EXISTS movie (
          movieID INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          language VARCHAR(100),
          duration INT,
          releaseDay DATE,
          description TEXT,
          ageLimit INT,
          poster_url NVARCHAR(250),
          backdrop_url NVARCHAR(250)
        )
      `
    },
    {
      name: 'category',
      sql: `
        CREATE TABLE IF NOT EXISTS category (
          categoryID INT AUTO_INCREMENT PRIMARY KEY,
          categoryName VARCHAR(100) NOT NULL UNIQUE
        )
      `
    },
    {
      name: 'diretor',
      sql: `
        CREATE TABLE IF NOT EXISTS director (
          directorID INT AUTO_INCREMENT PRIMARY KEY,
          directorName VARCHAR(255) NOT NULL
        )
      `
    },
    {
      name: 'writer',
      sql: `
        CREATE TABLE IF NOT EXISTS writer (
          writerID INT AUTO_INCREMENT PRIMARY KEY,
          writerName VARCHAR(255) NOT NULL
        )
      `
    },
    {
      name: 'actor',
      sql: `
        CREATE TABLE IF NOT EXISTS actor (
          actorID INT AUTO_INCREMENT PRIMARY KEY,
          actorName VARCHAR(255) NOT NULL
        )
      `
    },
    {
      name: 'movie_category',
      sql: `
        CREATE TABLE IF NOT EXISTS movie_category (
          movieID INT NOT NULL,
          categoryID INT NOT NULL,
          PRIMARY KEY (movieID, categoryID),
          FOREIGN KEY (movieID) REFERENCES movie(movieID) ON DELETE CASCADE
        )
      `
    },
    {
      name: 'movie_director',
      sql: `
        CREATE TABLE IF NOT EXISTS movie_director (
          movieID INT NOT NULL,
          directorID INT NOT NULL,

          PRIMARY KEY (movieID, directorID),
          FOREIGN KEY (movieID) REFERENCES movie(movieID) ON DELETE CASCADE
        )
      `
    },
    {
      name: 'movie_actor',
      sql: `
        CREATE TABLE IF NOT EXISTS movie_actor (
          movieID INT NOT NULL,
          actorID INT NOT NULL,

          PRIMARY KEY (movieID, actorID),
          FOREIGN KEY (movieID) REFERENCES movie(movieID) ON DELETE CASCADE
        )
      `
    },
    {
      name: 'director_category',
      sql: `
        CREATE TABLE IF NOT EXISTS movie_director (
          movieID INT NOT NULL,
          directorID INT NOT NULL,

          PRIMARY KEY (movieID, directorID),
          FOREIGN KEY (movieID) REFERENCES movie(movieID) ON DELETE CASCADE,
          FOREIGN KEY (directorID) REFERENCES director(directorID) ON DELETE CASCADE
        )
      `
    }
  ];


  const createTablesSequentially = async () => {
    for (const table of tables) {
      await new Promise((resolve) => {
        connection.query(table.sql, (err) => {
          if (err) {
            console.error(`❌ Lỗi khi tạo bảng "${table.name}":`, err.message);
          } else {
            console.log(`✅ Bảng "${table.name}" đã sẵn sàng.`);
          }
          resolve();
        });
      });
    }
  };

  createTablesSequentially().then(() => {
    console.log("✅ Tất cả bảng đã được tạo xong!");
  });

});

export default connection;
