import styles from './DateBox.module.scss';

const DateBox = ({ date }) => {
    return (
        <div>
            <div>{date.month}</div>
            <div>{date.day}</div>
            <div>{date.weekday}</div>
        </div>
    );
};

export default DateBox;
