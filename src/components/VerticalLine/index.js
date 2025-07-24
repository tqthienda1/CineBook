import styles from './VerticalLine.module.scss';

const VerticalLine = ({ width, color }) => {
    return <div className={styles.verticalLine} style={{ width: `${width}`, backgroundColor: `${color}` }}></div>;
};

export default VerticalLine;
