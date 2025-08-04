import styles from './Tab.module.scss';
import clsx from 'clsx';

const Tab = ({ children, onClick, className, turnActive = true }) => {
    return (
        <h1 className={clsx(className, styles.tab, turnActive ? styles.active : '')} onClick={onClick}>
            {children}
        </h1>
    );
};

export default Tab;
