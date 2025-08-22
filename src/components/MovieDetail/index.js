import styles from './MovieDetail.module.scss';
import { format } from 'date-fns';
import { LuTags } from 'react-icons/lu';
import { MdLanguage } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { LiaImdb } from 'react-icons/lia';
import { MdDateRange } from 'react-icons/md';
import clsx from 'clsx';
import SeparateLine from '../SeparateLine';

const MovieDeTail = ({
  posterURL,
  name,
  category,
  language,
  duration,
  IMDBrating,
  ageLimit,
  releaseDay,
  description,
  directors,
  writers,
  actors,
}) => {
  //Chuyển định dạng ngày
  const [year, month, day] = releaseDay.split('-');
  const dateObj = new Date(year, month - 1, day);

  return (
    <div className={clsx(styles.movieDetail, styles.row)}>
      <img className={styles.poster} src={`/assets/${posterURL}`} alt="" />

      <div className={clsx(styles.col, styles.info)}>
        <h1>{name}</h1>

        <div className={clsx(styles.row, styles.subinfo1)}>
          <ul className={styles.row}>
            <LuTags className={styles.icon} />
            {category.map((item, index) => (
              <li key={index}>{item + (index !== category.length - 1 ? ', ' : '')}</li>
            ))}
          </ul>

          <div className={styles.language}>
            <MdLanguage className={styles.icon} />
            {language}
          </div>

          <div>
            <BiTime className={styles.icon} />
            {duration}
          </div>
        </div>

        <div className={clsx(styles.row, styles.subinfo2)}>
          <div>
            <LiaImdb className={styles.imdb} />
            {IMDBrating}/10
          </div>

          <div className={styles.ageLimit}>PG-{ageLimit}</div>

          <div>
            <MdDateRange className={styles.dateIcon} />
            {format(dateObj, 'MMM d, yyyy')}
          </div>
        </div>

        <p className={styles.description}>{description}</p>
      </div>

      <div className={clsx(styles.col, styles.creator)}>
        <SeparateLine />
        <h2>Directors</h2>
        <ul>
          {directors.map((item, index) => (
            <li key={index}>{item + (index !== directors.length - 1 ? ',' : '')}</li>
          ))}
        </ul>

        <SeparateLine />
        <h2>Writers</h2>
        <ul>
          {writers.map((item, index) => (
            <li key={index}>{item + (index !== writers.length - 1 ? ',' : '')}</li>
          ))}
        </ul>

        <SeparateLine />
        <h2>Actor</h2>
        <ul>
          {actors.map((item, index) => (
            <li key={index}>{item + (index !== actors.length - 1 ? ',' : '')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDeTail;
