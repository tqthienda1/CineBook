import styles from './MovieCard.module.scss';
import { MdPlayCircle } from 'react-icons/md';
import Button from '../Button';
import { Link } from 'react-router-dom';

const MovieCard = ({ movieName, imgSource }) => {
    return (
        <div className={styles.movieCard}>
            <Link to="/booking">
                <img className={styles.poster} src={imgSource} alt="" />
                <h2 className={styles.movieName}>{movieName}</h2>
            </Link>
            <div className={styles.buttons}>
                <Link to="/booking">
                    <Button>Buy tickets</Button>
                </Link>
                <h2 className={styles.trailer}>
                    <MdPlayCircle className={styles.playButton} />
                    Trailer
                </h2>
            </div>
        </div>
    );
};

export default MovieCard;
