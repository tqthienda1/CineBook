import styles from './Booking.module.scss';
import MovieDeTail from '../../components/MovieDetail';
import thumbnail from '../../assets/f1_thumbnail.jpg';
import poster from '../../assets/f1_poster_02.jpg';
import { FaCirclePlay } from 'react-icons/fa6';
import SeparateLine from '../../components/SeparateLine';
import DateSlider from '../../components/DateSlider';

const movieInfo = {
    poster: poster,
    title: 'F1 The Movie',
    category: ['Action', 'Drama'],
    language: 'US',
    duration: 156,
    imdb: 7.9,
    ageLimit: 13,
    releasedDate: '26/06/2025',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    director: ['Joseph Kosinski'],
    writer: ['duc thinh', 'baolong'],
    actor: ['quoc thien'],
};

const Booking = () => {
    return (
        <div className={styles.container}>
            <div className={styles.thumbnailWrapper}>
                <img className={styles.thumbnail} src={thumbnail} alt="" />
                <FaCirclePlay className={styles.playButton} />
            </div>

            <MovieDeTail {...movieInfo} />

            <SeparateLine text="SHOWTIME" lineColor={'#fb2b2b'} className={styles.separateLine} />

            <DateSlider />
        </div>
    );
};

export default Booking;
