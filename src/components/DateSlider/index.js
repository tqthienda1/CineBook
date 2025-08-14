import styles from './DateSlider.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { eachDayOfInterval, format } from 'date-fns';
import DateBox from '../DateBox';
import { useState } from 'react';
import VerticalLine from '../VerticalLine';
import { PiClipboard } from 'react-icons/pi';

const DateSlider = () => {
    const today = new Date();
    const end = new Date();
    end.setDate(today.getDate() + 2);
    const dates = eachDayOfInterval({ start: today, end });
    const datesList = dates.map((date) => ({
        fullDate: date,
        day: format(date, 'dd'),
        month: format(date, 'MMM'),
        weekday: format(date, 'EEE'),
    }));

    const [pickingDate, setPickingDate] = useState(today);

    const handleNextClick = () => {
        const nextDate = new Date(pickingDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setPickingDate(nextDate);
    };

    const handlePrevCLick = () => {
        if (pickingDate.toDateString() === today.toDateString()) {
            return;
        }

        const prevDate = new Date(pickingDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setPickingDate(prevDate);
    };

    return (
        <div className={styles.datesSlider}>
            <label>DATE</label>
            <IoIosArrowBack onClick={handlePrevCLick} />
            <ul className={styles.datesList}>
                {datesList.map((date, index) => (
                    <li
                        key={index}
                        className={
                            date.fullDate.toDateString() === pickingDate.toDateString() ? styles.pickingDate : ''
                        }
                    >
                        <DateBox date={date} />
                    </li>
                ))}
            </ul>

            <IoIosArrowForward onClick={handleNextClick} />

            <VerticalLine />
            <label>LOCATION</label>
        </div>
    );
};

export default DateSlider;
