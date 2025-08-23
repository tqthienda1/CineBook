import styles from './Banner.module.scss';
import BannerBar from '../BannerBar';

const Banner = ({ movieName, imgSource, movieID }) => {
    return (
        <div className={styles.banner}>
            <img className={styles.backdrop} src={imgSource} alt="" />
            <BannerBar movieName={movieName} movieID={movieID} />
        </div>
    );
};

export default Banner;
