import styles from './ShowtimeSection.module.scss';
import { CiLocationOn } from 'react-icons/ci';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import Showtime from '../Showtime';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const ShowtimeSection = ({
  cinemaName,
  address,
  selectShowtime,
  handleSelectFavorite,
  handleSelectShowtime,
  sectionFavoriteIndex,
  selectSectionFavorite,
  sectionShowtimeIndex,
  selectSectionShowtime,
  cinemaID,
  pickingDate,
  movieID,
}) => {
  const [showtimesList, setShowtimesList] = useState();

  useEffect(() => {
    const getShowtimesList = async () => {
      try {
        const formattedPickingDate = pickingDate
          .toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\//g, '-');

        const res = await fetch(
          `http://localhost:5003/user/showtimes?movieID=${movieID}&cinemaID=${cinemaID}&showDate=${formattedPickingDate}`,
        );

        const data = await res.json();

        console.log(data);
      } catch (error) {
        console.log('Fetch showtimes list error: ', error);
      }
    };
    getShowtimesList();
  }, [pickingDate]);

  return (
    <div className={clsx(styles.col, styles.showtimeSection)}>
      <div className={clsx(styles.row, styles.labelWrapper)}>
        <FaHeartCirclePlus
          onClick={() => handleSelectFavorite(sectionFavoriteIndex, cinemaID)}
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
      {showtimesList && (
        <ul className={styles.showtimesList}>
          {showtimesList.map((item, index) => (
            <li key={index}>
              <Showtime
                className={
                  index === selectShowtime && sectionShowtimeIndex === selectSectionShowtime
                    ? styles.selectedShowtime
                    : ''
                }
                onClick={() => handleSelectShowtime(index, sectionShowtimeIndex, item.time, cinemaName)}
                time={item.time}
                type={item.type}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowtimeSection;
