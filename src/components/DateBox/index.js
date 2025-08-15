import styles from './DateBox.module.scss';
import clsx from 'clsx';

const DateBox = ({ className, date }) => {
    return (
        <div className={clsx(className, styles.dateBox)}>
            <div>{date.month}</div>
            <div className={styles.day}>{date.day}</div>
            <div>{date.weekday}</div>
        </div>
    );
};

export default DateBox;
