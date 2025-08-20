import styles from './PromotionPoster.module.scss';
import { Link } from 'react-router-dom';

const PromotionPoster = ({ imgSource, title, short, condition, note }) => {
  return (
    <div className={styles.container}>
      <div className={styles.promotionPoster}>
        <img src={imgSource} alt="" />
        <div className={styles.detailContainer}>
          <h1>{title}</h1>
          <h2>{short}</h2>
          <span>Conditions:</span>
          <span>{condition}</span>
          <span>Notes:</span>
          <span>{note}</span>
          <Link to={'/booking'}>
            <button>BUY TICKET NOW</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionPoster;
