import styles from './MovieCard.module.scss';

const MovieCard = ({ movieName, imgSource }) => {
    return (
        <div className={styles.movieCard}>
            <img className={styles.poster} src={imgSource} alt="" />
            <h2 className={styles.movieName}>{movieName}</h2>
            <div className={styles.buttons}>
                <h2 className={styles.buyTicket}>Buy Tickets</h2>
                <h2 className={styles.trailer}>Trailer</h2>
            </div>
        </div>
    );
};

export default MovieCard;
