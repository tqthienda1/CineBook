import styles from './SeatInfo.module.scss';
import { IoTicketSharp } from 'react-icons/io5';
import clsx from 'clsx';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const SeatInfo = ({ selectedSeats, movieName, date, time, cinemaName }) => {
  return (
    <div className={styles.seatInfo}>
      <h1>Select Your Seats</h1>

      <div className={styles.row}>
        <div style={{ color: '#b2b2b2' }}>{selectedSeats.length} seats</div>
        <ul className={clsx(styles.row, styles.selectedSeats)}>
          {selectedSeats.map((item, index) => (
            <li className={styles.seat} key={index}>
              {alphabet[item.row] + `${item.col + 1}`}
            </li>
          ))}
        </ul>
      </div>

      <div className={clsx(styles.row, styles.movieTicketLabel)}>
        <h2>MOVIE TICKETS</h2>
        <IoTicketSharp className={styles.ticketIcon} />
      </div>
      <div style={{ color: '#b2b2b2' }}>
        <div className={clsx(styles.row, styles.space)}>
          <div>Movie</div>
          <div>{movieName}</div>
        </div>

        <div className={clsx(styles.row, styles.space)}>
          <div>Date & Time</div>
          <div>
            {date}; {time}
          </div>
        </div>

        <div className={clsx(styles.row, styles.space)}>
          <div>Cinema</div>
          <div>{cinemaName}</div>
        </div>
      </div>
    </div>
  );
};

export default SeatInfo;
