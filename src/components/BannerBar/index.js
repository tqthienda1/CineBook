import styles from './BannerBar.module.scss';
import { MdPlayCircle } from 'react-icons/md';
import BlurOverlay from '../BlurOverlay';

const BannerBar = ({ movieName }) => {
    return (
        <div className={styles.bannerBar}>
            <BlurOverlay />
            <h1 className={styles.movieName}>{movieName}</h1>
            <div className={styles.buttons}>
                <button className={styles.buyTicket}>BUY TICKET NOW</button>
                <button className={styles.trailer}>
                    <MdPlayCircle className={styles.playIcon} />
                    TRAILER
                </button>
            </div>
        </div>
    );
};

export default BannerBar;
