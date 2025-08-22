import styles from './DateSlider.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { eachDayOfInterval, format, isBefore, startOfDay } from 'date-fns';
import DateBox from '../DateBox';
import { useState } from 'react';
import VerticalLine from '../VerticalLine';
import clsx from 'clsx';
import Dropdown from '../Dropdown';

const citiesList = ['Ho Chi Minh City', 'Ha Noi', 'Da Nang'];

const DateSlider = ({ pickingDate, onSetDate, pickingDay, onSelectCity, cities }) => {
  const today = new Date();
  const end = new Date();
  const prevDay = new Date();

  pickingDay.setDate(today.getDate());
  end.setDate(pickingDay.getDate() + 2);
  prevDay.setDate(pickingDay.getDate() - 2);
  let dates = eachDayOfInterval({ start: prevDay, pickingDay, end });
  let datesList = dates.map((date) => ({
    fullDate: date,
    day: format(date, 'dd'),
    month: format(date, 'MMM'),
    weekday: format(date, 'EEE'),
  }));

  const [curDatesList, setCurDatesList] = useState(datesList);

  const updateDatesList = (curDay) => {
    pickingDay.setMonth(curDay.getMonth());
    pickingDay.setDate(curDay.getDate());
    end.setMonth(curDay.getMonth());
    end.setDate(pickingDay.getDate() + 2);
    prevDay.setMonth(curDay.getMonth());
    prevDay.setDate(pickingDay.getDate() - 2);
    dates = eachDayOfInterval({ start: prevDay, pickingDay, end });
    datesList = dates.map((date) => ({
      fullDate: date,
      day: format(date, 'dd'),
      month: format(date, 'MMM'),
      weekday: format(date, 'EEE'),
    }));

    setCurDatesList(datesList);
  };

  const handleNextClick = () => {
    const nextDate = new Date(pickingDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onSetDate(nextDate);
    updateDatesList(nextDate);
  };

  const handlePrevCLick = () => {
    if (pickingDate.toDateString() === today.toDateString()) {
      return;
    }

    const prevDate = new Date(pickingDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onSetDate(prevDate);

    updateDatesList(prevDate);
  };

  return (
    <div className={styles.datesSlider}>
      <label>DATE</label>
      <div className={styles.datesList}>
        <IoIosArrowBack className={styles.arrow} onClick={handlePrevCLick} />

        <div className={styles.highlightBox}></div>
        <ul>
          {curDatesList.map((date, index) => (
            <li
              key={index}
              className={clsx(
                isBefore(startOfDay(date.fullDate), startOfDay(today)) ||
                  date.fullDate.toDateString() !== pickingDate.toDateString()
                  ? styles.unhighlight
                  : '',
              )}
            >
              <DateBox
                className={date.fullDate.toDateString() === pickingDate.toDateString() ? styles.pickingDate : ''}
                date={date}
              />
            </li>
          ))}
        </ul>
        <IoIosArrowForward className={styles.arrow} onClick={handleNextClick} />
      </div>

      <div className={clsx(styles.cityPickingWrapper, styles.row)}>
        <VerticalLine />
        <div className={styles.col}>
          <label>LOCATION</label>
          <div className={clsx(styles.row, styles.cityPickingDropbox)}>
            <Dropdown defaultValue={'Select City'} content={cities} returnValue={onSelectCity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSlider;
