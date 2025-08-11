import styles from './SeparateLine.module.scss';
import clsx from 'clsx';

const SeparateLine = ({ text, textColor, lineColor, className }) => {
    return (
        <div className={clsx(styles.divider, className)}>
            <hr style={{ color: lineColor }} />
            {text && (
                <>
                    <span style={{ color: textColor }}>{text}</span>
                    <hr style={{ color: lineColor }} />
                </>
            )}
        </div>
    );
};

export default SeparateLine;
