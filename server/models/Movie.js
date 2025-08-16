import connection from '../db.js';

const Movie = {
  // Lấy tất cả phim
  async getAllMovies() {
    const sql = `
      SELECT 
        m.movie_id,
        m.name,
        m.releaseDay,
        m.duration,
        m.description,
        m.ageLimit,

        GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS directors,
        GROUP_CONCAT(DISTINCT w.name ORDER BY w.name SEPARATOR ', ') AS writers,
        GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS actors

      FROM movie m

      LEFT JOIN movie_director md ON m.movie_id = md.movie_id
      LEFT JOIN director d ON md.director_id = d.director_id

      LEFT JOIN movie_writer mw ON m.movie_id = mw.movie_id
      LEFT JOIN writer w ON mw.writer_id = w.writer_id

      LEFT JOIN movie_actor ma ON m.movie_id = ma.movie_id
      LEFT JOIN actor a ON ma.actor_id = a.actor_id

      GROUP BY m.movie_id
    `;
    const [rows] = await connection.promise().execute(sql);
    return rows;
  },

  // Lấy phim theo id
  async getMovieById(id) {
    const sql = `
      SELECT 
        m.movie_id,
        m.name,
        m.category,
        m.language,
        m.duration,
        m.releaseDay,
        m.description,

        GROUP_CONCAT(DISTINCT d.name ORDER BY d.name SEPARATOR ', ') AS directors,
        GROUP_CONCAT(DISTINCT w.name ORDER BY w.name SEPARATOR ', ') AS writers,
        GROUP_CONCAT(DISTINCT a.name ORDER BY a.name SEPARATOR ', ') AS actors

      FROM movie m
      LEFT JOIN movie_director md ON m.movie_id = md.movie_id
      LEFT JOIN director d ON md.director_id = d.director_id

      LEFT JOIN movie_writer mw ON m.movie_id = mw.movie_id
      LEFT JOIN writer w ON mw.writer_id = w.writer_id

      LEFT JOIN movie_actor ma ON m.movie_id = ma.movie_id
      LEFT JOIN actor a ON ma.actor_id = a.actor_id

      WHERE m.movie_id = ?
      GROUP BY m.movie_id
    `;
    const [rows] = await connection.promise().execute(sql, [id]);
    return rows[0] || null;
  },

  // Thêm phim mới
  async createMovie(movieData) {
    const { name, category, language, duration, releaseDay, description, directors, writers, actors } = movieData;

    // Insert movie chính
    const queryMovie = `
      INSERT INTO movie (name, category, language, duration, releaseDay, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.promise().execute(queryMovie, [
      name,
      category,
      language,
      duration,
      releaseDay,
      description,
    ]);

    const movieId = result.insertId;

    // Hàm phụ: insert hoặc lấy id của director/writer/actor
    async function getOrCreate(table, column, name) {
      const [rows] = await connection.promise().execute(
        `SELECT id FROM ${table} WHERE ${column} = ?`,
        [name]
      );
      if (rows.length > 0) return rows[0].id;

      const [insertResult] = await connection.promise().execute(
        `INSERT INTO ${table} (${column}) VALUES (?)`,
        [name]
      );
      return insertResult.insertId;
    }

    // Hàm phụ: insert vào bảng trung gian
    async function link(table, column, ids) {
      if (ids.length > 0) {
        const query = `INSERT INTO ${table} (movie_id, ${column}) VALUES ?`;
        const values = ids.map((id) => [movieId, id]);
        await connection.promise().query(query, [values]);
      }
    }

    // 2. Xử lý directors
    const directorIds = [];
    for (const d of directors || []) {
      const id = await getOrCreate("director", "name", d);
      directorIds.push(id);
    }
    await link("movie_director", "director_id", directorIds);

    // 3. Xử lý writers
    const writerIds = [];
    for (const w of writers || []) {
      const id = await getOrCreate("writer", "name", w);
      writerIds.push(id);
    }
    await link("movie_writer", "writer_id", writerIds);

    // 4. Xử lý actors
    const actorIds = [];
    for (const a of actors || []) {
      const id = await getOrCreate("actor", "name", a);
      actorIds.push(id);
    }
    await link("movie_actor", "actor_id", actorIds);

    return { id: movieId, name, category, language, duration, releaseDay, description };
  },
};

export default Movie;
