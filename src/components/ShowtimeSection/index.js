import styles from './ShowtimeSection.module.scss';
import { CiLocationOn } from 'react-icons/ci';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import Showtime from '../Showtime';
import clsx from 'clsx';
import { useState } from 'react';

const ShowtimeSection = ({
  cinemaName,
  address,
  showtimesList,
  selectShowtime,
  handleSelectFavorite,
  handleSelectShowtime,
  sectionFavoriteIndex,
  selectSectionFavorite,
  sectionShowtimeIndex,
  selectSectionShowtime,
}) => {
  console.log(sectionFavoriteIndex, sectionShowtimeIndex);
  return (
    <div className={clsx(styles.col, styles.showtimeSection)}>
      <div className={clsx(styles.row, styles.labelWrapper)}>
        <FaHeartCirclePlus
          onClick={() => handleSelectFavorite(sectionFavoriteIndex)}
          className={clsx(styles.favoriteButton, sectionFavoriteIndex === selectSectionFavorite ? styles.selected : '')}
        />
        <div className={clsx(styles.col)}>
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
              className={
                index === selectShowtime && sectionShowtimeIndex === selectSectionShowtime
                  ? styles.selectedShowtime
                  : ''
              }
              onClick={() => handleSelectShowtime(index, sectionShowtimeIndex)}
              time={item.time}
              type={item.type}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimeSection;
