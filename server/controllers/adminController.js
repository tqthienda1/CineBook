import Movie from '../models/Movie.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
}

export const addMovie = async (req, res) => {
  try {
    // Logic to add a movie
    const { name, language, duration, releaseDay, description, poster_url, backdrop_url } = req.body;
    const newMovie = {
      name,
      language,
      duration,
      releaseDay,
      description,
      poster_url,
      backdrop_url
    };
    
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
}