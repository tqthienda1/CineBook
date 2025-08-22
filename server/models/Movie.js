import connection from '../db.js';

const Movie = {
  // Lấy tất cả phim
  async getAllMovies() {
    const sql = `
      SELECT
        m.movieID,
        m.name,
        m.language,
        m.duration,
        m.releaseDay,
        m.IMDBrating,
        m.description,
        m.ageLimit,
        m.status,
        m.posterURL,
        m.backdropURL,

        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(c.categoryName)), ']') AS JSON) AS category,
        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(d.directorName)), ']') AS JSON) AS directors,
        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(w.writerName)), ']') AS JSON) AS writers,
        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(a.actorName)), ']') AS JSON) AS actors  

      FROM movie m
      LEFT JOIN movie_director md ON m.movieID = md.movieID
      LEFT JOIN director d ON md.directorID = d.directorID

      LEFT JOIN movie_writer mw ON m.movieID = mw.movieID
      LEFT JOIN writer w ON mw.writerID = w.writerID

      LEFT JOIN movie_actor ma ON m.movieID = ma.movieID
      LEFT JOIN actor a ON ma.actorID = a.actorID

      LEFT JOIN movie_category mc ON m.movieID = mc.movieID
      LEFT JOIN category c ON mc.categoryID = c.categoryID

      GROUP BY m.movieID
    `;
    const [rows] = await connection.promise().execute(sql);
    return rows;
  },

  // Lấy phim theo id
  async getMovieByID(movieID) {
    const sql = `
      SELECT
        m.movieID,
        m.name,
        m.language,
        m.duration,
        m.releaseDay,
        m.IMDBrating,
        m.description,
        m.ageLimit,
        m.status,
        m.posterURL,
        m.backdropURL,

        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(c.categoryName)), ']') AS JSON) AS category,
        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(d.directorName)), ']') AS JSON) AS directors,
        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(w.writerName)), ']') AS JSON) AS writers,
        CAST(CONCAT('[', GROUP_CONCAT(DISTINCT JSON_QUOTE(a.actorName)), ']') AS JSON) AS actors  

      FROM movie m
      LEFT JOIN movie_director md ON m.movieID = md.movieID
      LEFT JOIN director d ON md.directorID = d.directorID

      LEFT JOIN movie_writer mw ON m.movieID = mw.movieID
      LEFT JOIN writer w ON mw.writerID = w.writerID

      LEFT JOIN movie_actor ma ON m.movieID = ma.movieID
      LEFT JOIN actor a ON ma.actorID = a.actorID

      LEFT JOIN movie_category mc ON m.movieID = mc.movieID
      LEFT JOIN category c ON mc.categoryID = c.categoryID

      WHERE m.movieID = ?
      GROUP BY m.movieID
    `;
    const [rows] = await connection.promise().execute(sql, [movieID]);
    return rows[0] || null;
  },

  async createMovie(movieData) {
    const {
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    } = movieData;

    const sqlAddCategory = `
      INSERT IGNORE INTO category (categoryName) VALUES (?)
    `;

    const sqlAddDirector = `
      INSERT IGNORE INTO director (directorName) VALUES (?)
    `;

    const sqlAddWriter = `
      INSERT IGNORE INTO writer (writerName) VALUES (?)
    `;

    const sqlAddActor = `
      INSERT IGNORE INTO actor (actorName) VALUES (?)
    `;

    for (const cat of category) {
      console.log('Adding category:', cat);
      await connection.promise().execute(sqlAddCategory, [cat]);
    }

    for (const dir of directors) {
      await connection.promise().execute(sqlAddDirector, [dir]);
    }

    for (const w of writers) {
      await connection.promise().execute(sqlAddWriter, [w]);
    }

    for (const act of actors) {
      await connection.promise().execute(sqlAddActor, [act]);
    }

    // Insert movie chính
    const sqlAddMovie = `
      INSERT INTO movie (name, language, duration, releaseDay, IMDBrating, description, ageLimit, status, posterURL, backdropURL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    console.log('Adding movie with data:', {
      name,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    });

    const [result] = await connection
      .promise()
      .execute(sqlAddMovie, [
        name,
        language,
        duration,
        releaseDay,
        IMDBrating,
        description,
        ageLimit,
        status,
        posterURL,
        backdropURL,
      ]);

    const sqlAddMovieCategory = `
      INSERT INTO movie_category (movieID, categoryID)
      SELECT ?, categoryID 
      FROM category 
      WHERE categoryName IN (${category.map(() => '?').join(',')})
    `;

    await connection.promise().execute(sqlAddMovieCategory, [result.insertId, ...category]);

    const sqlAddMovieDirector = `
      INSERT INTO movie_director (movieID, directorID)
      SELECT ?, directorID
      FROM director 
      WHERE directorName IN (${directors.map(() => '?').join(',')}) 
    `;
    await connection.promise().execute(sqlAddMovieDirector, [result.insertId, ...directors]);

    const sqlAddMovieWriter = `
      INSERT INTO movie_writer (movieID, writerID)
      SELECT ?, writerID
      FROM writer
      WHERE writerName IN (${writers.map(() => '?').join(',')})
    `;
    await connection.promise().execute(sqlAddMovieWriter, [result.insertId, ...writers]);

    const sqlAddMovieActor = `
      INSERT INTO movie_actor (movieID, actorID)
      SELECT ?, actorID
      FROM actor 
      WHERE actorName IN (${actors.map(() => '?').join(',')}) 
    `;
    await connection.promise().execute(sqlAddMovieActor, [result.insertId, ...actors]);

    return {
      movieID: result.insertId,
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    };
  },



  // Cập nhật thông tin phim
  async editMovie(movieID, movieData) {
    const {
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    } = movieData;

    // Thêm category, director, writer, actor mới (nếu chưa có)
    const sqlAddCategory = `INSERT IGNORE INTO category (categoryName) VALUES (?)`;
    const sqlAddDirector = `INSERT IGNORE INTO director (directorName) VALUES (?)`;
    const sqlAddWriter = `INSERT IGNORE INTO writer (writerName) VALUES (?)`;
    const sqlAddActor = `INSERT IGNORE INTO actor (actorName) VALUES (?)`;

    for (const cat of category) {
      await connection.promise().execute(sqlAddCategory, [cat]);
    }
    for (const dir of directors) {
      await connection.promise().execute(sqlAddDirector, [dir]);
    }
    for (const w of writers) {
      await connection.promise().execute(sqlAddWriter, [w]);
    }
    for (const act of actors) {
      await connection.promise().execute(sqlAddActor, [act]);
    }

    // Update movie chính
    const sqlUpdateMovie = `
    UPDATE movie
    SET 
      name=?,
      language=?,
      duration=?,   
      releaseDay=?, 
      IMDBrating=?, 
      description=?, 
      ageLimit=?, 
      status=?, 
      posterURL=?, 
      backdropURL=?
    WHERE movieID=?
    `;

      
    await connection
      .promise()
      .execute(sqlUpdateMovie, [
        name,
        language,
        duration,
        releaseDay,
        IMDBrating,
        description,
        ageLimit,
        status,
        posterURL,
        backdropURL,
        movieID,
      ]);

    // Xóa liên kết cũ
    await connection.promise().execute(`DELETE FROM movie_category WHERE movieID=?`, [movieID]);
    await connection.promise().execute(`DELETE FROM movie_director WHERE movieID=?`, [movieID]);
    await connection.promise().execute(`DELETE FROM movie_writer WHERE movieID=?`, [movieID]);
    await connection.promise().execute(`DELETE FROM movie_actor WHERE movieID=?`, [movieID]);

    // Thêm liên kết mới
    const sqlAddMovieCategory = `
    INSERT INTO movie_category (movieID, categoryID)
    SELECT ?, categoryID 
    FROM category 
    WHERE categoryName IN (${category.map(() => '?').join(',')})
  `;
    await connection.promise().execute(sqlAddMovieCategory, [movieID, ...category]);

    const sqlAddMovieDirector = `
    INSERT INTO movie_director (movieID, directorID)
    SELECT ?, directorID 
    FROM director 
    WHERE directorName IN (${directors.map(() => '?').join(',')})
  `;
    await connection.promise().execute(sqlAddMovieDirector, [movieID, ...directors]);

    const sqlAddMovieWriter = `
    INSERT INTO movie_writer (movieID, writerID)
    SELECT ?, writerID 
    FROM writer 
    WHERE writerName IN (${writers.map(() => '?').join(',')})
  `;
    await connection.promise().execute(sqlAddMovieWriter, [movieID, ...writers]);

    const sqlAddMovieActor = `
    INSERT INTO movie_actor (movieID, actorID)
    SELECT ?, actorID 
    FROM actor 
    WHERE actorName IN (${actors.map(() => '?').join(',')})
  `;
    await connection.promise().execute(sqlAddMovieActor, [movieID, ...actors]);

    return {
      movieID,
      name,
      category,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      directors,
      writers,
      actors,
      ageLimit,
      status,
      posterURL,
      backdropURL,
    };
  },

  // Xóa phim
  async deleteMovie (movieID) {
    const sqlDeleteMovie = `DELETE FROM movie WHERE movieID = ?`;
    const [result] = await connection.promise().execute(sqlDeleteMovie, [movieID]);

    if (result.affectedRows === 0) {
      return null; // Không tìm thấy phim để xóa
    }

    // Xóa các liên kết với category, director, writer, actor
    await connection.promise().execute(`DELETE FROM movie_category WHERE movieID=?`, [movieID]);
    await connection.promise().execute(`DELETE FROM movie_director WHERE movieID=?`, [movieID]);
    await connection.promise().execute(`DELETE FROM movie_writer WHERE movieID=?`, [movieID]);
    await connection.promise().execute(`DELETE FROM movie_actor WHERE movieID=?`, [movieID]);

    return { message: 'Phim đã được xóa thành công' };
  },

  async getAllCity() {
    const sql = `
      SELECT DISTINCT city
      FROM cinema
      ORDER BY city
    `;

    const [rows] = await connection.promise().execute(sql);
    return rows;
  }
};



export default Movie;
