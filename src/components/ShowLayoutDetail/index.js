import React from 'react';
import clsx from 'clsx';
import styles from './ShowLayoutDetail.module.scss';

const ShowLayoutDetail = ({ layout, onClose }) => {
  if (!layout) return null;

  const matrix = [];
  for (let r = 0; r < layout.numRow; r++) {
    matrix.push(layout.seats.slice(r * layout.numCol, (r + 1) * layout.numCol));
  }

  return (
    <div className={styles.fullscreen}>
      <div className={styles.header}>
        <h2>Layout: {layout.layoutID}</h2>
        <button onClick={onClose}>Đóng</button>
      </div>

      <div className={styles.seatMatrix}>
        {matrix.map((rowArr, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {rowArr.map((seat, colIndex) => (
              <button key={colIndex} className={clsx(styles.seatBtn, styles[seat.type])} disabled>
                {seat.type === 'regular'
                  ? 'R'
                  : seat.type === 'coupleLeft'
                  ? 'C'
                  : seat.type === 'coupleRight'
                  ? 'P'
                  : 'P'}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowLayoutDetail;
