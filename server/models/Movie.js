import connection from '../db.js';

const Movie = {
  // Lấy tất cả phim
  // async getAllMovies() {
  //   const sql = `
  //     SELECT
  //       m.movideID,
  //       m.name,
  //       m.language,
  //       m.duration,
  //       m.releaseDay,
  //       m.IMDBrating,
  //       m.description,
  //       m.posterURL,
  //       m.backdropURL,

  //       GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS category,
  //       GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS directors,
  //       GROUP_CONCAT(DISTINCT w.name ORDER BY w.name SEPARATOR ', ') AS writers,
  //       GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS actors

  //     FROM movie m
  //     LEFT JOIN movie_director md ON m.movideID = md.movideID
  //     LEFT JOIN director d ON md.directorID = d.directorID

  //     LEFT JOIN movie_writer mw ON m.movideID = mw.movideID
  //     LEFT JOIN writer w ON mw.writerID = w.writerID

  //     LEFT JOIN movie_actor ma ON m.movideID = ma.movideID
  //     LEFT JOIN actor a ON ma.actorID = a.actorID

  //     LEFT JOIN movie_category mc ON m.movideID = mc.movideID
  //     LEFT JOIN category c ON mc.categoryID = c.categoryID

  //     GROUP BY m.movideID
  //   `;
  //   const [rows] = await connection.promise().execute(sql);
  //   return rows;
  // },

  // // Lấy phim theo id
  // async getMovieById(id) {
  //   const sql = `
  //     SELECT
  //       m.movideID,
  //       m.name,
  //       m.language,
  //       m.duration,
  //       m.releaseDay,
  //       m.IMDBrating,
  //       m.description,
  //       m.posterURL,
  //       m.backdropURL,

  //       GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS category,
  //       GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS directors,
  //       GROUP_CONCAT(DISTINCT w.name ORDER BY w.name SEPARATOR ', ') AS writers,
  //       GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS actors

  //     FROM movie m
  //     LEFT JOIN movie_director md ON m.movideID = md.movideID
  //     LEFT JOIN director d ON md.directorID = d.directorID

  //     LEFT JOIN movie_writer mw ON m.movideID = mw.movideID
  //     LEFT JOIN writer w ON mw.writerID = w.writerID

  //     LEFT JOIN movie_actor ma ON m.movideID = ma.movideID
  //     LEFT JOIN actor a ON ma.actorID = a.actorID

  //     LEFT JOIN movie_category mc ON m.movideID = mc.movideID
  //     LEFT JOIN category c ON mc.categoryID = c.categoryID

  //     WHERE m.movideID = ?
  //     GROUP BY m.movideID
  //   `;
  //   const [rows] = await connection.promise().execute(sql, [id]);
  //   return rows[0] || null;
  // },

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

    //   return movie;
    return result.insertId;
  },
};

export default Movie;
