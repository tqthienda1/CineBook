import styles from './Banner.module.scss';
import BannerBar from '../BannerBar';
import { Link } from 'react-router-dom';

const Banner = ({ movieName, imgSource, movieID, movieTrailer }) => {
  return (
    <div className={styles.banner}>
      <Link to={`/booking/${movieID}`}>
        <img className={styles.backdrop} src={imgSource} alt="" />
      </Link>
      <BannerBar movieName={movieName} movieID={movieID} movieTrailer={movieTrailer} />
    </div>
  );
};

export default Banner;
