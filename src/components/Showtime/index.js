import styles from './Showtime.module.scss';
import clsx from 'clsx';

const Showtime = ({ time, type, className, onClick }) => {
  return (
    <div onClick={onClick} className={clsx(styles.showtime, className)}>
      <h1 className={styles.time}>{time}</h1>
      <div className={styles.type}>{type}</div>
    </div>
  );
};

export default Showtime;
