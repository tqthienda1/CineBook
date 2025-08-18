import connection from '../db.js';

const Movie = {
  // Lấy tất cả phim
  async getAllMovies() {
    const sql = `
      SELECT 
        m.movideID,
        m.name,
        m.language,
        m.duration,
        m.releaseDay,
        m.IMDBrating,
        m.description,
        m.poster_url,
        m.backdrop_url,

        GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS category,
        GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS directors,
        GROUP_CONCAT(DISTINCT w.name ORDER BY w.name SEPARATOR ', ') AS writers,
        GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS actors

      FROM movie m
      LEFT JOIN movie_director md ON m.movideID = md.movideID
      LEFT JOIN director d ON md.directorID = d.directorID

      LEFT JOIN movie_writer mw ON m.movideID = mw.movideID
      LEFT JOIN writer w ON mw.writerID = w.writerID

      LEFT JOIN movie_actor ma ON m.movideID = ma.movideID
      LEFT JOIN actor a ON ma.actorID = a.actorID

      LEFT JOIN movie_category mc ON m.movideID = mc.movideID
      LEFT JOIN category c ON mc.categoryID = c.categoryID

      GROUP BY m.movideID
    `;
    const [rows] = await connection.promise().execute(sql);
    return rows;
  },

  // Lấy phim theo id
  async getMovieById(id) {
    const sql = `
      SELECT 
        m.movideID,
        m.name,
        m.language,
        m.duration,
        m.releaseDay,
        m.IMDBrating,
        m.description,
        m.poster_url,
        m.backdrop_url,

        GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS category,
        GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS directors,
        GROUP_CONCAT(DISTINCT w.name ORDER BY w.name SEPARATOR ', ') AS writers,
        GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS actors

      FROM movie m
      LEFT JOIN movie_director md ON m.movideID = md.movideID
      LEFT JOIN director d ON md.directorID = d.directorID

      LEFT JOIN movie_writer mw ON m.movideID = mw.movideID
      LEFT JOIN writer w ON mw.writerID = w.writerID

      LEFT JOIN movie_actor ma ON m.movideID = ma.movideID
      LEFT JOIN actor a ON ma.actorID = a.actorID

      LEFT JOIN movie_category mc ON m.movideID = mc.movideID
      LEFT JOIN category c ON mc.categoryID = c.categoryID

      WHERE m.movideID = ?
      GROUP BY m.movideID
    `;
    const [rows] = await connection.promise().execute(sql, [id]);
    return rows[0] || null;
  },

  // Thêm phim mới
  // async createMovie(movieData) {
  //   const { name, category, language, duration, releaseDay, IMDBrating, description, directors, writers, actors } = movieData;

  //   // Insert movie chính
  //   const queryMovie = `
  //     INSERT INTO movie (name, category, language, duration, releaseDay, IMDBrating, description)
  //     VALUES (?, ?, ?, ?, ?, ?, ?)
  //   `;
  //   const [result] = await connection.promise().execute(queryMovie, [
  //     name,
  //     category,
  //     language,
  //     duration,
  //     releaseDay,
  //     IMDBrating,
  //     description,
  //   ]);

  //   const movieId = result.insertId;

  //   // Hàm phụ: insert hoặc lấy id của director/writer/actor
  //   async function getOrCreate(table, column, name) {
  //     const [rows] = await connection.promise().execute(
  //       `SELECT id FROM ${table} WHERE ${column} = ?`,
  //       [name]
  //     );
  //     if (rows.length > 0) return rows[0].id;

  //     const [insertResult] = await connection.promise().execute(
  //       `INSERT INTO ${table} (${column}) VALUES (?)`,
  //       [name]
  //     );
  //     return insertResult.insertId;
  //   }

  //   // Hàm phụ: insert vào bảng trung gian
  //   async function link(table, column, ids) {
  //     if (ids.length > 0) {
  //       const query = `INSERT INTO ${table} (movideID, ${column}) VALUES ?`;
  //       const values = ids.map((id) => [movieId, id]);
  //       await connection.promise().query(query, [values]);
  //     }
  //   }

  //   // 2. Xử lý directors
  //   const directorIds = [];
  //   for (const d of directors || []) {
  //     const id = await getOrCreate("director", "name", d);
  //     directorIds.push(id);
  //   }
  //   await link("movie_director", "directorID", directorIds);

  //   // 3. Xử lý writers
  //   const writerIds = [];
  //   for (const w of writers || []) {
  //     const id = await getOrCreate("writer", "name", w);
  //     writerIds.push(id);
  //   }
  //   await link("movie_writer", "writerID", writerIds);

  //   // 4. Xử lý actors
  //   const actorIds = [];
  //   for (const a of actors || []) {
  //     const id = await getOrCreate("actor", "name", a);
  //     actorIds.push(id);
  //   }
  //   await link("movie_actor", "actorID", actorIds);

  //   return { id: movieId, name, category, language, duration, releaseDay, description };
  // },

  async createMovie(movieData) {
    const { name, language, duration, releaseDay, IMDBrating, description, poster_url, backdrop_url } = movieData;

    const sql = `
      INSERT INTO movie (name, language, duration, releaseDay, IMDBrating description, poster_url, backdrop_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.promise().execute(sql, [
      name,
      language,
      duration,
      releaseDay,
      IMDBrating,
      description,
      poster_url,
      backdrop_url
    ]);

    return { id: result.insertId, ...movieData };
  }
};

export default Movie;
