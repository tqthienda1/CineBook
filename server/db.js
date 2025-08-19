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
  //   'movie_director',
  //   'movie_actor', 
  //   'movie_writer',
  //   'movie_category',
  //   'movie',
  //   'user',
  //   'category',
  //   'director',
  //   'writer',
  //   'actor'
  // ];

  // for (const table of dropTables) {
  //   await new Promise((resolve) => {
  //     connection.query(`DROP TABLE IF EXISTS ${table}`, () => resolve());
  //   });
  //   console.log(`✅ Đã xóa bảng ${table}`);
  // }
  // console.log('🗑️ Đã xóa các bảng cũ');

    

  const tables = [
    {
      name: 'user',
      sql: `
        CREATE TABLE IF NOT EXISTS user (
          userID INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          birthday DATE,
          role VARCHAR(10)
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
          IMDBrating FLOAT,
          description TEXT,
          ageLimit INT,
          status VARCHAR(20) DEFAULT 'active',
          posterURL NVARCHAR(250),
          backdropURL NVARCHAR(250),

          CONSTRAINT uq_movie_name_release UNIQUE (name, releaseDay)
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
          directorName VARCHAR(255) NOT NULL UNIQUE
        )
      `
    },
    {
      name: 'writer',
      sql: `
        CREATE TABLE IF NOT EXISTS writer (
          writerID INT AUTO_INCREMENT PRIMARY KEY,
          writerName VARCHAR(255) NOT NULL UNIQUE
        )
      `
    },
    {
      name: 'actor',
      sql: `
        CREATE TABLE IF NOT EXISTS actor (
          actorID INT AUTO_INCREMENT PRIMARY KEY,
          actorName VARCHAR(255) NOT NULL UNIQUE
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
      name: 'movie_writer',
      sql: `
        CREATE TABLE IF NOT EXISTS movie_writer (
          movieID INT NOT NULL, 
          writerID INT NOT NULL,

          PRIMARY KEY (movieID, writerID),
          FOREIGN KEY (movieID) REFERENCES movie(movieID) ON DELETE CASCADE
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
