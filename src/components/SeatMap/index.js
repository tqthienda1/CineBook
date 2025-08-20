import styles from './SeatMap.module.scss';
import screen from '../../assets/screen.png';

const SeatMap = () => {
  return (
    <div className={styles.seatMap}>
      <div className={styles.screenWrapper}>
        <img className={styles.screen} src={screen} alt="" />
        <div className={styles.screenLabel}>SCREEN</div>
      </div>
      <div className={styles.seatDefinition}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.regularSeat}></div>
            <div>Regular</div>
          </div>

          <div className={styles.col}>
            <div className={styles.coupleSeat}></div>
            <div>Couple</div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.regularSeat}></div>
            <div>Available</div>
          </div>

          <div className={styles.col}>
            <div className={styles.takenSeat}></div>
            <div>Taken</div>
          </div>

          <div className={styles.col}>
            <div className={styles.selectedSeat}></div>
            <div>Selected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
