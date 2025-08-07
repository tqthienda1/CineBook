import styles from './MovieDetail.module.scss';
import { format } from 'date-fns';
import { LuTags } from 'react-icons/lu';
import { MdLanguage } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';
import { LiaImdb } from 'react-icons/lia';
import { MdDateRange } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import clsx from 'clsx';

const MovieDeTail = ({
    poster,
    title,
    category,
    language,
    duration,
    imdb,
    ageLimit,
    releasedDate,
    description,
    director,
    writer,
    actor,
}) => {
    //Chuyển định dạng ngày
    const [day, month, year] = releasedDate.split('/');
    const dateObj = new Date(year, month - 1, day);

    return (
        <div className={styles.movieDetail}>
            <img className={styles.poster} src={poster} alt="" />

            <div className={clsx(styles.col, styles.col1)}>
                <h1>{title}</h1>

                <ul>
                    <LuTags />
                    {category.map((item, index) => (
                        <li key={index}>{item}</li>
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

                <div>
                    <LiaImdb />
                    {imdb}
                </div>

                <div>{ageLimit}</div>

                <div>
                    <MdDateRange />
                    {format(dateObj, 'MMM d, yyyy')}
                </div>

                <p className={styles.description}>{description}</p>
                <div>
                    Read More
                    <IoIosArrowDown />
                </div>
            </div>

            <div className={clsx(styles.col, styles.col2)}>
                <ul>
                    {director.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <IoIosArrowForward />

                <ul>
                    {writer.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <IoIosArrowForward />

                <ul>
                    {actor.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <IoIosArrowForward />
            </div>
        </div>
    );
};

export default MovieDeTail;
