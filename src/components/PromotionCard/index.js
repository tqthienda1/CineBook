import styles from './PromotionCard.module.scss';
import { Link } from 'react-router-dom';

const PromotionCard = ({ imgSource }) => {
  const handleRouteChange = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.promotionCard}>
      <Link to={'/promotions'}>
        <img className={styles.banner} src={imgSource} alt="" onClick={handleRouteChange} />
      </Link>
    </div>
  );
};

export default PromotionCard;
