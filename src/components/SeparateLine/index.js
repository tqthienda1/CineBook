import styles from './SeparateLine.module.scss';
import clsx from 'clsx';

const SeparateLine = ({ text, className }) => {
    return (
        <div className={clsx(styles.divider, className)}>
            <hr />
            {text && (
                <>
                    <span>{text}</span>
                    <hr />
                </>
            )}
        </div>
    );
};

export default SeparateLine;
