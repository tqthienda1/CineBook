import styles from './Seat.module.scss';
import SeatInfo from '../SeatInfo';
import PriceBox from '../PriceBox';
import SeatMap from '../SeatMap';
import { useState } from 'react';

const Seat = ({ movieName, date, time, cinemaName }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelectSeat = (seat) => {
    setSelectedSeats((prev) => [...prev, seat]);
  };

  const handleRemoveSeat = (seat) => {
    setSelectedSeats((prev) => prev.filter((s) => s !== seat));
  };

  return (
    <div className={styles.seatSection}>
      <div className={styles.row}>
        <div>
          <SeatInfo
            selectedSeats={selectedSeats}
            movieName={movieName}
            date={date}
            time={time}
            cinemaName={cinemaName}
          />
          <PriceBox selectedSeats={selectedSeats} />
        </div>
        <SeatMap onSelectSeat={handleSelectSeat} onRemoveSeat={handleRemoveSeat} selectedSeats={selectedSeats} />
      </div>
    </div>
  );
};

export default Seat;
