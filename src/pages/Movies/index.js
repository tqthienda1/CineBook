import MovieCard from '../../components/MovieCard';
import poster1 from '../../assets/f1_poster_02.jpg';
import styles from './Movies.module.scss';
import { useState, useEffect } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('http://localhost:5003/user/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Lỗi khi lấy danh sách phim');
        }
        console.log(res);

        const data = await res.json();
        console.log(data);
        setMovies(data);
      } catch (err) {
        console.error('Fetch movies error:', err);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div className={styles.background}>
      <h1>NOW SHOWING</h1>
      <div className={styles.movieContainer}>
        {movies.map((movie) => (
          <>
            <MovieCard movieName={movie.name} imgSource={`/assets/${movie.posterURL}`} movieID={movie.movieID} />
            {console.log(movie.posterURL)}
          </>
        ))}
      </div>
    </div>
  );
};

export default Movies;
