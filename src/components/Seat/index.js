import styles from './Seat.module.scss';
import SeatInfo from '../SeatInfo';
import PriceBox from '../PriceBox';
import SeatMap from '../SeatMap';

const Seat = ({ selectedSeats, movieName, date, time, cinemaName }) => {
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
        <SeatMap />
      </div>
    </div>
  );
};

export default Seat;
