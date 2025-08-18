import styles from './ShowtimeSection.module.scss';
import { CiLocationOn } from 'react-icons/ci';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import Showtime from '../Showtime';
import clsx from 'clsx';
import { useState } from 'react';

const ShowtimeSection = ({ cinemaName, address, showtimesList }) => {
  const [selectFavorite, setSelectFavorite] = useState(false);
  const [selectShowtime, setSelectShowtime] = useState();

  const handleSelectFavorite = () => {
    setSelectFavorite(!selectFavorite);
  };

  const handleSelectShowtime = (index) => {
    setSelectShowtime(index);
  };

  return (
    <div className={clsx(styles.col, styles.showtimeSection)}>
      <div className={styles.row}>
        <FaHeartCirclePlus
          onClick={handleSelectFavorite}
          className={clsx(styles.favoriteButton, selectFavorite ? styles.selected : '')}
        />
        <div className={styles.col}>
          <h1>{cinemaName}</h1>
          <div className={styles.row}>
            <CiLocationOn className={styles.locationIcon} />
            <div>{address}</div>
          </div>
        </div>
      </div>
      <ul className={styles.showtimesList}>
        {showtimesList.map((item, index) => (
          <li key={index}>
            <Showtime
              className={index === selectShowtime ? styles.selectedShowtime : ''}
              onClick={() => handleSelectShowtime(index)}
              time={item.time}
              type={item.type}
            />
            {console.log(selectShowtime, index)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimeSection;
