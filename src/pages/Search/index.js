import MovieCard from '../../components/MovieCard';
import styles from './Search.module.scss';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('name', searchParams.get('name'));

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`http://localhost:5003/user/movies/search?name=${searchParams.get('name')}`, {
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
        setMovies(data);
      } catch (err) {
        console.error('Fetch movies error:', err);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div className={styles.background}>
      <h1>SEARCH RESULTS</h1>
      <div
        style={{ 'grid-template-columns': `repeat(${movies.length < 4 ? movies.length : 4}, minmax(auto, auto))` }}
        className={styles.movieContainer}
      >
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

export default Search;
