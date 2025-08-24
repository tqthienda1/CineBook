import styles from './MovieCard.module.scss';
import { MdPlayCircle } from 'react-icons/md';
import Button from '../Button';
import { Link, useParams } from 'react-router-dom';

const MovieCard = ({ movieName, imgSource, movieID, movieTrailer }) => {
  return (
    <div className={styles.movieCard}>
      <Link to={`/booking/${movieID}`}>
        <img className={styles.poster} src={imgSource} alt="" />
        <h2 className={styles.movieName}>{movieName}</h2>
      </Link>
      <div className={styles.buttons}>
        <Link to={`/booking/${movieID}`}>
          <Button>Buy tickets</Button>
        </Link>
        <a href={movieTrailer ? movieTrailer : ''} target="_blank">
          <h2 className={styles.trailer}>
            <MdPlayCircle className={styles.playButton} />
            Trailer
          </h2>
        </a>
      </div>
    </div>
  );
};

export default MovieCard;
