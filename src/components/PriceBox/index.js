import styles from './PriceBox.module.scss';
import clsx from 'clsx';
import SeparateLine from '../SeparateLine';

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

const PriceBox = ({ selectedSeats }) => {
  const regularSeats = selectedSeats.filter((seat) => seat.type === 'regular');
  const totalRegularSeatsCost = regularSeats.reduce((sum, item) => sum + item.price, 0);
  const coupleSeats = selectedSeats.filter((seat) => seat.type === 'couple1');
  const totalCoupleSeatsCost = coupleSeats.reduce((sum, item) => sum + item.price, 0);
  const totalSeatsCost = selectedSeats.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.priceBox}>
      {regularSeats && (
        <div className={clsx(styles.row, styles.typeSeatSection)}>
          <div className={clsx(styles.label, styles.regular)}>REGULAR</div>
          <div className={styles.priceSeatsWrappper}>
            <div>{`$${totalRegularSeatsCost}`}</div>
            <ul className={clsx(styles.row, styles.seats)}>
              {regularSeats.map((item, index) => (
                <li key={index}>
                  {alphabet[item.row] + `${item.col + 1}` + (index < regularSeats.length - 1 ? ', ' : '')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {coupleSeats && (
        <div className={clsx(styles.row, styles.typeSeatSection)}>
          <div className={clsx(styles.label, styles.couple)}>COUPLE</div>
          <div className={styles.priceSeatsWrappper}>
            <div>{`$${totalCoupleSeatsCost}`}</div>
            <ul className={clsx(styles.row, styles.seats)}>
              {coupleSeats.map((item, index) => (
                <li key={index}>{alphabet[item.row] + `${item.col}` + (index < coupleSeats.length - 1 ? ', ' : '')}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <SeparateLine className={styles.line} />
      <div className={clsx(styles.row, styles.totalPrice)}>
        <div>TOTAL PRICE</div>
        <div>{`$${totalSeatsCost}`}</div>
      </div>

      <div className={styles.buyButton}>BUY</div>
    </div>
  );
};

export default PriceBox;
