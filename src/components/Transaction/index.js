import styles from './Transaction.module.scss';
import clsx from 'clsx';
import { LuTicket, LuFilter } from 'react-icons/lu';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const Transaction = ({ id, title, imgSource, date, time, location }) => {
  return (
    <div className={styles.transactionContainer}>
      <img src={imgSource} alt="Movie image" />
      <div>
        <div>
          <h2>{title}</h2>
          <p>{'Transaction ID: ' + id}</p>
        </div>
        <div className={styles.transactionDetails}>
          <div className={styles.detailIcon}>
            <FaCalendarAlt />
            <div className={styles.textBox}>
              <p1>{date}</p1>
              <p>Show date</p>
            </div>
          </div>
          <div className={styles.detailIcon}>
            <FaRegClock />
            <div className={styles.textBox}>
              <p1>{time}</p1>
              <p>Showtime</p>
            </div>
          </div>
          <div className={styles.detailIcon}>
            <FaLocationDot />
            <p1 className={styles.textBox}>{location}</p1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
