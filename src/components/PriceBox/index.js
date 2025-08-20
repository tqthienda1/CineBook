import styles from './PriceBox.module.scss';
import clsx from 'clsx';
import SeparateLine from '../SeparateLine';

const PriceBox = ({ selectedSeats }) => {
  const regularSeats = selectedSeats.filter((seat) => seat.type === 'REGULAR');
  const totalRegularSeatsCost = regularSeats.reduce((sum, item) => sum + item.price, 0);
  const coupleSeats = selectedSeats.filter((seat) => seat.type === 'COUPLE');
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
                <li key={index}>{item.row + item.col + (index < regularSeats.length - 1 ? ', ' : '')}</li>
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
                <li key={index}>{item.row + item.col + (index < coupleSeats.length - 1 ? ', ' : '')}</li>
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
    </div>
  );
};

export default PriceBox;
