import styles from './Cinema.module.scss';
import ShowtimeSection from '../ShowtimeSection';

const showtimeInfo = [
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
  { time: '11:45', type: '2d' },
];

const Cinema = ({ cinemaList }) => {
  return (
    <ul className={styles.cinemaList}>
      {cinemaList.map((item, index) => (
        <li key={index}>
          <ShowtimeSection cinemaName={item.cinemaName} address={item.address} showtimesList={showtimeInfo} />
        </li>
      ))}
    </ul>
  );
};

export default Cinema;
