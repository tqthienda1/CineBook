import styles from './Cinema.module.scss';
import ShowtimeSection from '../ShowtimeSection';
import { useState } from 'react';

const showtimeInfo = [
  { time: '11:45', type: '2d' },
  { time: '12:45', type: '2d' },
  { time: '13:45', type: '2d' },
  { time: '14:45', type: '2d' },
  { time: '15:45', type: '2d' },
  { time: '16:45', type: '2d' },
  { time: '17:45', type: '2d' },
  { time: '18:45', type: '2d' },
  { time: '19:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
];

const Cinema = ({ cinemaList, onSelectShowtime, selectShowtime, selectSectionShowtime }) => {
  const [selectSectionFavorite, setSelectSectionFavorite] = useState();

  const handleSelectFavorite = (sectionIndex) => {
    if (selectSectionFavorite === sectionIndex) {
      setSelectSectionFavorite(null);
    } else {
      setSelectSectionFavorite(sectionIndex);
    }
  };

  return (
    <ul className={styles.cinemaList}>
      {cinemaList.map((item, index) => (
        <li key={index}>
          <ShowtimeSection
            cinemaName={item.cinemaName}
            address={item.address}
            showtimesList={showtimeInfo}
            selectShowtime={selectShowtime}
            selectSectionFavorite={selectSectionFavorite}
            selectSectionShowtime={selectSectionShowtime}
            handleSelectFavorite={handleSelectFavorite}
            handleSelectShowtime={onSelectShowtime}
            sectionFavoriteIndex={index}
            sectionShowtimeIndex={index}
          />
        </li>
      ))}
    </ul>
  );
};

export default Cinema;
