import styles from './Banner.module.scss';
import BannerBar from '../BannerBar';

const Banner = ({ movieName, imgSource, movieID, movieTrailer }) => {
    return (
        <div className={styles.banner}>
            <img className={styles.backdrop} src={imgSource} alt="" />
            <BannerBar movieName={movieName} movieID={movieID} movieTrailer={movieTrailer} />
        </div>
    );
};

export default Banner;
