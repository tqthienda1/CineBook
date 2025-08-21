import styles from './PopUp.module.scss';

const PopUp = ({ content, onClick, setPosition }) => {
  return (
    <div style={{ position: `${setPosition}` }} className={styles.background}>
      <div className={styles.popUp}>
        <div className={styles.content}>{content}</div>
        <div onClick={onClick} className={styles.button}>
          OK
        </div>
      </div>
    </div>
  );
};

export default PopUp;
