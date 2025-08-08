import MovieCard from '../../components/MovieCard';
import poster1 from '../../assets/f1_poster.jpg';
import styles from './Movies.module.scss';

const Movies = () => {
  return (
    <div className={styles.background}>
      <h1>NOW SHOWING</h1>
      <div className={styles.movieContainer}>
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
        <MovieCard movieName={'F1 The Movie'} imgSource={poster1} />
      </div>
    </div>
  );
};

export default Movies;
