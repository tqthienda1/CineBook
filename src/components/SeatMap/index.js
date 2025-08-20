import styles from './SeatMap.module.scss';
import screen from '../../assets/screen.png';
import seatLayout from '../../MockData/seatLayout';
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

const SeatMap = ({ onSelectSeat, onRemoveSeat, selectedSeats }) => {
  const seatMatrix = Array.from({ length: seatLayout.numRow }, (_, r) =>
    Array.from(
      { length: seatLayout.numCol },
      (_, c) => seatLayout.seats.find((seat) => seat.row === r && seat.col === c) || null,
    ),
  );

  return (
    <div className={styles.seatMap}>
      <div className={styles.screenWrapper}>
        <img className={styles.screen} src={screen} alt="" />
        <div className={styles.screenLabel}>SCREEN</div>
      </div>

      <div className={styles.seatLayoutWrapper}>
        <div className={clsx(styles.col, styles.seatLayout)}>
          {seatMatrix.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
              {row.map((col, colIndex) => {
                return (
                  col.type !== 'couple2' && (
                    <div
                      key={colIndex}
                      className={clsx(
                        col.type === 'regular' ? styles.regularSeat : '',
                        col.type === 'path' ? styles.path : '',
                        col.status === 'taken' ? styles.takenSeat : '',
                        col.type === 'couple1' ? styles.coupleSeat : '',
                        selectedSeats.includes(col) ? styles.selectedSeat : '',
                        styles.seat,
                      )}
                      onClick={() => {
                        if (col.status === 'available') {
                          if (!selectedSeats.includes(col)) {
                            onSelectSeat(col);
                          } else {
                            onRemoveSeat(col);
                          }
                        }
                      }}
                    >
                      {col.type !== 'path' && `${alphabet[col.row]}${col.col + 1}`}
                    </div>
                  )
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.seatDefinitionWrapper}>
        <div className={styles.row}>
          <div className={clsx(styles.col, styles.seatDefinition)}>
            <div className={styles.regularSeat}></div>
            <div>Regular</div>
          </div>

          <div className={clsx(styles.col, styles.seatDefinition)}>
            <div className={styles.coupleSeat}></div>
            <div>Couple</div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={clsx(styles.col, styles.seatDefinition)}>
            <div className={styles.regularSeat}></div>
            <div>Available</div>
          </div>

          <div className={clsx(styles.col, styles.seatDefinition)}>
            <div className={clsx(styles.takenSeat, styles.regularSeat)}></div>
            <div>Taken</div>
          </div>

          <div className={clsx(styles.col, styles.seatDefinition)}>
            <div className={clsx(styles.selectedSeat, styles.regularSeat)}></div>
            <div>Selected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
