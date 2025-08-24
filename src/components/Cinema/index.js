import styles from './Cinema.module.scss';
import ShowtimeSection from '../ShowtimeSection';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const Cinema = ({ cinemaList, onSelectShowtime, selectShowtime, selectSectionShowtime, movieID, pickingDate }) => {
  const navigate = useNavigate();
  const [selectSectionFavorite, setSelectSectionFavorite] = useState();

  const updateFavoriteCinema = async (cinemaID) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5003/user/favoritecinema`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          favoriteCinema: cinemaID,
        }),
      });
    } catch (err) {
      console.error('Fetch movie error:', err);
    }
  };

  const handleSelectFavorite = (sectionIndex, cinemaID) => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (selectSectionFavorite === sectionIndex) {
      setSelectSectionFavorite(null);
    } else {
      setSelectSectionFavorite(sectionIndex);
    }

    updateFavoriteCinema(cinemaID);
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
            cinemaID={item.cinemaID}
            movieID={movieID}
            pickingDate={pickingDate}
          />
        </li>
      ))}
    </ul>
  );
};

export default Cinema;
