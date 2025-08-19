import styles from './Cinema.module.scss';
import ShowtimeSection from '../ShowtimeSection';
import { useState } from 'react';

const showtimeInfo = [
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
];

const Cinema = ({ cinemaList }) => {
  const [selectFavorite, setSelectFavorite] = useState(false);
  const [selectSectionFavorite, setSelectSectionFavorite] = useState();
  const [selectSectionShowtime, setSelectSectionShowtime] = useState();
  const [selectShowtime, setSelectShowtime] = useState();

  const handleSelectFavorite = (sectionIndex) => {
    if (sectionIndex === selectSectionFavorite) {
      setSelectFavorite(!selectFavorite);
    }
    setSelectSectionFavorite(sectionIndex);
  };

  const handleSelectShowtime = (showtimeIndex, sectionIndex) => {
    setSelectShowtime(showtimeIndex)
    setSelectSectionShowtime(sectionIndex)
  };
  return (
    <ul className={styles.cinemaList}>
      {cinemaList.map((item, index) => (
        <li key={index}>
          <ShowtimeSection
            cinemaName={item.cinemaName}
            address={item.address}
            showtimesList={showtimeInfo}
            selectFavorite={selectFavorite}
            selectShowtime={selectShowtime}
            selectSectionFavorite={selectSectionFavorite}
            selectSectionShowtime={selectSectionShowtime}
            handleSelectFavorite={handleSelectFavorite}
            handleSelectShowtime={handleSelectShowtime}
            sectionFavoriteIndex={index}
            sectionShowtimeIndex={index}
          />
        </li>
      ))}
    </ul>
  );
};

export default Cinema;
