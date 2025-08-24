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
    console.error('Lỗi kết nối MySQL:', err.message);
    process.exit(1);
  }
  console.log('Đã kết nối MySQL Railway');


  // // check is connect to railway
  // // show table on railway
  // connection.query('SHOW TABLES', (err, results) => {
  //   if (err) {
  //     console.error('❌ Lỗi khi lấy danh sách bảng:', err.message);
  //   } else {
  //     console.log('📋 Danh sách bảng hiện có trên Railway:');
  //     results.forEach((row) => {
  //       console.log(`- ${Object.values(row)[0]}`);
  //     });
  //   }
  // });

  const dropTables = [
    // 'movie_director',
    // 'movie_actor', 
    // 'movie_writer',
    // 'movie_category',
    // 'movie',
    // 'user',
    // 'category',
    // 'director',
    // 'writer',
    // 'actor'
    // 'cinema_room',
    // 'cinema',
    // 'showtime',
    // 'room',
    // 'seat',
    // 'layout',



  ];

  for (const table of dropTables) {
    await new Promise((resolve) => {
      connection.query(`DROP TABLE IF EXISTS ${table}`, () => resolve());
    });
    console.log(`✅ Đã xóa bảng ${table}`);
  }
  console.log('🗑️ Đã xóa các bảng cũ');

    

  const tables = [
    {
      name: 'user',
      sql: `
        CREATE TABLE IF NOT EXISTS user (
          userID INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          fullname VARCHAR(255),
          phone VARCHAR(20),
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
          posterURL NVARCHAR(250),
          backdropURL NVARCHAR(250),
          trailerURL NVARCHAR(255),

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
      name: 'director',
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
    },
    {
      name: 'cinema',
      sql: `
        CREATE TABLE IF NOT EXISTS cinema (
          cinemaID INT AUTO_INCREMENT PRIMARY KEY,
          cinemaName VARCHAR(255) NOT NULL UNIQUE,
          address NVARCHAR(255) NOT NULL,
          city VARCHAR(100) NOT NULL,
          phone VARCHAR(20)
        )
      `
    },
    {
      name: 'room',
      sql: `
        CREATE TABLE IF NOT EXISTS room (
          roomID INT AUTO_INCREMENT PRIMARY KEY,
          cinemaID INT NOT NULL,
          roomName VARCHAR(50) NOT NULL,
          capacity INT NOT NULL,
          layoutID INT NOT NULL,

          FOREIGN KEY (cinemaID) REFERENCES cinema(cinemaID) ON DELETE CASCADE
        )
      `
    },
    {
      name: 'layout',
      sql: `
        CREATE TABLE IF NOT EXISTS layout (
          layoutID INT AUTO_INCREMENT PRIMARY KEY,
          numCol INT NOT NULL,
          numRow INT NOT NULL
        )
      `
    },
    {
      name: 'seat',
      sql: `
        CREATE TABLE IF NOT EXISTS seat (
          id INT AUTO_INCREMENT PRIMARY KEY, 
          seatID char(5),
          layoutID INT,
          rowNum INT NOT NULL,
          colNum INT NOT NULL,
          status VARCHAR(20) DEFAULT 'available',
          type VARCHAR(20) DEFAULT 'regular',
          price DECIMAL(10, 2) DEFAULT 0,

          FOREIGN KEY (layoutID) REFERENCES layout(layoutID) ON DELETE CASCADE
        )
      `
    },
    {
      name: 'showtime',
      sql: `
        CREATE TABLE IF NOT EXISTS showtime (
          showtimeID INT AUTO_INCREMENT PRIMARY KEY,
          movieID INT NOT NULL,
          roomID INT NOT NULL,
          cinemaID INT NOT NULL,
          startTime DATETIME NOT NULL,
          endTime DATETIME NOT NULL,

          FOREIGN KEY (movieID) REFERENCES movie(movieID) ON DELETE CASCADE,
          FOREIGN KEY (roomID) REFERENCES room(roomID) ON DELETE CASCADE
        )
      `
    }, 

  ];


  const createTablesSequentially = async () => {
    for (const table of tables) {
      await new Promise((resolve) => {
        connection.query(table.sql, (err) => {
          if (err) {
            console.error(`Lỗi khi tạo bảng "${table.name}":`, err.message);
          }
          //  else {
          //   console.log(`✅ Bảng "${table.name}" đã sẵn sàng.`);
          // }
          resolve();
        });
      });
    }
  };

  createTablesSequentially().then(() => {
    console.log("Tất cả bảng đã được tạo xong!");
  });

});

export default connection;
