import styles from './Booking.module.scss';
import MovieDeTail from '../../components/MovieDetail';
import thumbnail from '../../assets/f1_thumbnail.jpg';
import { FaCirclePlay } from 'react-icons/fa6';
import SeparateLine from '../../components/SeparateLine';
import DateSlider from '../../components/DateSlider';
import Cinema from '../../components/Cinema';
import Seat from '../../components/Seat';
import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

const cinemaInfo = [
  { cinemaName: 'CineBook Quốc Thanh', address: '271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Thành Phố Hồ Chí Minh' },
  { cinemaName: 'CineBook Quốc Thanh', address: '271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Thành Phố Hồ Chí Minh' },
];

const Booking = () => {
  const { movieID } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const pickingDay = new Date();
  const [pickingDate, setPickingDate] = useState(pickingDay);
  const [selectSectionShowtime, setSelectSectionShowtime] = useState();
  const [selectShowtime, setSelectShowtime] = useState();
  const [selectTime, setSelectTime] = useState();
  const [selectCity, setSelectCity] = useState();
  const [cinemasList, setCinemasList] = useState();
  const [cities, setCities] = useState();
  const [selectCinema, setSelectCinema] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovieInfoAndCities = async () => {
      try {
        const res = await fetch(`http://localhost:5003/user/movies/${movieID}?city=${selectCity}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Lỗi khi lấy phim');
        }

        const data = await res.json();
        setMovieInfo(data.movie);
        setSelectCinema(null);
        setSelectShowtime(null);
        if (data.cities) {
          setCities(data.cities);
        }
        if (data.cinema) {
          setCinemasList(data.cinema);
        }
      } catch (err) {
        console.error('Fetch movie error:', err);
      }
    };
    fetchMovieInfoAndCities();
  }, [movieID, selectCity]);

  const handleSelectShowtime = (showtimeIndex, sectionIndex, time, cinemaName) => {
    setSelectShowtime(showtimeIndex);
    setSelectSectionShowtime(sectionIndex);
    setSelectTime(time);
    setSelectCinema(cinemaName);
  };

  const handleSetDate = (date) => {
    setPickingDate(date);
  };

  const handleSelectCity = (city) => {
    setSelectCity(city);
    setSearchParams({ city });
  };

  if (movieInfo) {
    return (
      <div className={styles.container}>
        <div className={styles.thumbnailWrapper}>
          <img className={styles.thumbnail} src={thumbnail} alt="" />
          <FaCirclePlay className={styles.playButton} />
        </div>
        <MovieDeTail {...movieInfo} />

        <div className={styles.margin}></div>
        <SeparateLine text="SHOWTIME" lineColor={'#fb2b2b'} className={styles.separateLine} />
        <div className={styles.margin}></div>
        <DateSlider
          pickingDate={pickingDate}
          onSetDate={handleSetDate}
          pickingDay={pickingDay}
          onSelectCity={handleSelectCity}
          cities={cities}
        />
        <div className={styles.margin}></div>

        {cinemasList && (
          <>
            <SeparateLine text="CINEMA LIST" lineColor={'#fb2b2b'} className={styles.separateLine} />
            <Cinema
              cinemaList={cinemasList}
              onSelectShowtime={handleSelectShowtime}
              selectSectionShowtime={selectSectionShowtime}
              selectShowtime={selectShowtime}
            />
          </>
        )}

        {selectShowtime && (
          <>
            <SeparateLine text="SEAT" lineColor={'#fb2b2b'} className={styles.separateLine} />
            <Seat
              movieName={movieInfo.name}
              date={pickingDate.toLocaleDateString('vi-VN')}
              cinemaName={selectCinema}
              time={selectTime}
            />
          </>
        )}
      </div>
    );
  }
};

export default Booking;
