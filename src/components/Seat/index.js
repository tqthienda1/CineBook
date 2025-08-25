import styles from './Seat.module.scss';
import SeatInfo from '../SeatInfo';
import PriceBox from '../PriceBox';
import SeatMap from '../SeatMap';
import { useEffect, useState } from 'react';

const Seat = ({ movieName, date, time, cinemaName, seatLayout, handleSubmitBuy }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats([]);
  }, seatLayout);

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
          <PriceBox selectedSeats={selectedSeats} handleSubmitBuy={handleSubmitBuy} />
        </div>
        <SeatMap
          onSelectSeat={handleSelectSeat}
          onRemoveSeat={handleRemoveSeat}
          selectedSeats={selectedSeats}
          seatLayout={seatLayout}
        />
      </div>
    </div>
  );
};

export default Seat;
