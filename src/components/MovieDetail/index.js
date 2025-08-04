import styles from './MovieDetail.module.scss';
import thumbnail from '../../assets/f1_thumbnail.jpg';

const MovieDeTail = () => {
    return <img className={styles.thumbnail} src={thumbnail} alt="" />;
};

export default MovieDeTail;
