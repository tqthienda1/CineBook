import styles from './SeparateLine.module.scss';

const SeparateLine = ({ text }) => {
    return (
        <div className={styles.divider}>
            <hr />
            <span>{text}</span>
            <hr />
        </div>
    );
};

export default SeparateLine;
