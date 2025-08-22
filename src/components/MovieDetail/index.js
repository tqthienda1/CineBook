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
  poster,
  title,
  category,
  language,
  duration,
  imdb,
  ageLimit,
  releaseDate,
  description,
  director,
  writer,
  actor,
}) => {
  //Chuyển định dạng ngày
  const [day, month, year] = releaseDate.split('/');
  const dateObj = new Date(year, month - 1, day);

  return (
    <div className={clsx(styles.movieDetail, styles.row)}>
      <img className={styles.poster} src={poster} alt="" />

      <div className={clsx(styles.col, styles.info)}>
        <h1>{title}</h1>

        <div className={clsx(styles.row, styles.subinfo1)}>
          <ul className={styles.row}>
            <LuTags />
            {category.map((item, index) => (
              <li key={index}>{item + (index !== category.length - 1 ? ', ' : '')}</li>
            ))}
          </ul>

          <div>
            <MdLanguage />
            {language}
          </div>

          <div>
            <BiTime />
            {duration}
          </div>
        </div>

        <div className={clsx(styles.row, styles.subinfo2)}>
          <div>
            <LiaImdb className={styles.imdb} />
            {imdb}/10
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
          {director.map((item, index) => (
            <li key={index}>{item + (index !== director.length - 1 ? ',' : '')}</li>
          ))}
        </ul>

        <SeparateLine />
        <h2>Writers</h2>
        <ul>
          {writer.map((item, index) => (
            <li key={index}>{item + (index !== writer.length - 1 ? ',' : '')}</li>
          ))}
        </ul>

        <SeparateLine />
        <h2>Actor</h2>
        <ul>
          {actor.map((item, index) => (
            <li key={index}>{item + (index !== actor.length - 1 ? ',' : '')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDeTail;
