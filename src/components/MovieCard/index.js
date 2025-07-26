import styles from './MovieCard.module.scss';
import { MdPlayCircle } from 'react-icons/md';

const MovieCard = ({ movieName, imgSource }) => {
    return (
        <div className={styles.movieCard}>
            <img className={styles.poster} src={imgSource} alt="" />
            <h2 className={styles.movieName}>{movieName}</h2>
            <div className={styles.buttons}>
                <h2 className={styles.buyTicket}>Buy Tickets</h2>
                <h2 className={styles.trailer}>
                    <MdPlayCircle className={styles.playButton} />
                    Trailer
                </h2>
            </div>
        </div>
    );
};

export default MovieCard;
