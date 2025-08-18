import styles from './PromotionCard.module.scss';
import { Link } from 'react-router-dom';

const PromotionCard = ({ imgSource }) => {
  return (
    <div className={styles.promotionCard}>
      <img className={styles.banner} src={imgSource} alt="" />
    </div>
  );
};

export default PromotionCard;
