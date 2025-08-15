import styles from './FilterPurchaseHistory.module.scss';
import { LuTicket, LuFilter } from 'react-icons/lu';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const FilterPurchaseHistory = () => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filters}>
        <LuFilter />
        <p>Filters</p>
      </div>
      <div className={styles.filterContent}>
        <div>
          <p>Search</p>
          <input className={styles.box} type="text" placeholder="Search movies, theaters or transaction ID..." />
        </div>
        <div>
          <p>Payment Status</p>
          <select className={styles.box}>
            <option>All Statuses</option>
            <option>Paid</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div>
          <p>Date Range</p>
          <select className={styles.box}>
            <option>All time</option>
            <option>Last 30 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPurchaseHistory;
