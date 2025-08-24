import { RiArrowDropLeftLine } from 'react-icons/ri';
import { RiArrowDropRightLine } from 'react-icons/ri';
import styles from './Slider.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

const Slider = ({ items, numberItemsEachPage = 1, className }) => {
  const [curIndex, setCurIndex] = useState(0);
  console.log(items.length);
  const handlePrevCLick = () => {
    if (curIndex === 0) {
      setCurIndex(Math.ceil(items.length / numberItemsEachPage) - 1);
    } else {
      setCurIndex((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (curIndex === Math.ceil(items.length / numberItemsEachPage) - 1) {
      setCurIndex(0);
    } else {
      setCurIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      <RiArrowDropLeftLine onClick={handlePrevCLick} className={styles.prevArrow} />
      <div className={clsx(styles.slider, className)}>
        <ul
          className={styles.listItems}
          style={{
            width: `${items.length * (100 / numberItemsEachPage)}%`,
            transform: `translateX(-${(100 / items.length) * numberItemsEachPage * curIndex}%)`,
            transition: `transform 0.5s ease`,
          }}
        >
          {items.map((item, index) => (
            <li className={styles.item} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <RiArrowDropRightLine onClick={handleNextClick} className={styles.nextArrow} />
    </div>
  );
};

export default Slider;
