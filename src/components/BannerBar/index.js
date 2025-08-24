import styles from './BannerBar.module.scss';
import { MdPlayCircle } from 'react-icons/md';
import BlurOverlay from '../BlurOverlay';
import { Link } from 'react-router-dom';

const BannerBar = ({ movieName, movieID, movieTrailer }) => {
  return (
    <div className={styles.bannerBar}>
      <BlurOverlay />
      <h1 className={styles.movieName}>{movieName}</h1>
      <div className={styles.buttons}>
        <Link to={`/booking/${movieID}`}>
          <button className={styles.buyTicket}>BUY TICKET NOW</button>
        </Link>
        <a href={movieTrailer} target="_blank">
          <button className={styles.trailer}>
            <MdPlayCircle className={styles.playIcon} />
            TRAILER
          </button>
        </a>
      </div>
    </div>
  );
};

export default BannerBar;
