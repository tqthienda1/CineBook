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
import PopUp from '../../components/PopUp';
import { useNavigate } from 'react-router-dom';

function prioritizeFavoriteCinema(cinemaList, favoriteCinemaID) {
  const index = cinemaList.findIndex((cinema) => cinema.cinemaID === favoriteCinemaID);

  if (index > -1) {
    const [favoriteCinema] = cinemaList.splice(index, 1);
    cinemaList.unshift(favoriteCinema);
  }

  return cinemaList;
}

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
  const [seatLayout, setSeatLayout] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpContent, setPopUpContent] = useState('');

  useEffect(() => {
    const getFavoriteCinema = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        try {
          const res = await fetch('http://localhost:5003/user/favoritecinema', {
            method: 'GET',
            header: {
              'Content-Type': 'application/json',
            },
          });

          const data = await res.json();
          return data;
        } catch (error) {
          console.log('Fetch favorite cinema error: ', error);
        }
      }
    };

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
        console.log(data);
        setMovieInfo(data.movie);
        setSelectCinema(null);
        setSelectShowtime(null);
        if (data.cities) {
          setCities(data.cities);
        }
        if (data.cinema) {
          // const favoriteCinema = getFavoriteCinema();

          // if (favoriteCinema) {
          //   prioritizeFavoriteCinema(data.cinema, favoriteCinema);
          // }

          setCinemasList(data.cinema);
        }
        console.log(data);
      } catch (err) {
        console.error('Fetch movie error:', err);
      }
    };
    fetchMovieInfoAndCities();
  }, [movieID, selectCity]);

  const handleSelectShowtime = async (showtimeIndex, sectionIndex, time, cinemaName, roomID) => {
    try {
      const res = await fetch(`http://localhost:5003/user/layouts/room/${roomID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Lỗi khi lấy layout');
      }

      const data = await res.json();
      console.log(data);
      setSeatLayout(data);
    } catch (err) {
      console.error('Fetch layout error:', err);
    }

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
  };

  const handleSubmitBuy = (selectedSeats) => {
    if (selectedSeats.length > 0) {
      setPopUpContent('Buying tickets successfully');
    } else {
      setPopUpContent('Please select seat');
    }

    setShowPopUp(true);
  };

  const handleOKClick = () => {
    setShowPopUp(false);
  };

  if (movieInfo) {
    return (
      <div className={styles.container}>
        <a href={movieInfo.trailerURL} target="_blank">
          <div className={styles.thumbnailWrapper}>
            <img className={styles.thumbnail} src={`/assets/${movieInfo.backdropURL}`} alt="" />
            <FaCirclePlay className={styles.playButton} />
          </div>
        </a>
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
              pickingDate={pickingDate}
              movieID={movieInfo.movieID}
              selectCity={selectCity}
            />
          </>
        )}

        {selectShowtime !== null && (
          <>
            <SeparateLine text="SEAT" lineColor={'#fb2b2b'} className={styles.separateLine} />
            {showPopUp && <PopUp content={popUpContent} onClick={handleOKClick} />}
            <Seat
              movieName={movieInfo.name}
              date={pickingDate.toLocaleDateString('vi-VN')}
              cinemaName={selectCinema}
              time={selectTime}
              seatLayout={seatLayout}
              handleSubmitBuy={handleSubmitBuy}
            />
          </>
        )}
      </div>
    );
  }
};

export default Booking;
