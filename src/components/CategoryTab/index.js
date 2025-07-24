import styles from './CategoryTab.module.scss';
import VerticalLine from '../VerticalLine';
import clsx from 'clsx';
import { useState } from 'react';

const CategoryTab = () => {
    const [active, setActive] = useState('showing');

    const handleClick = (tab) => {
        setActive(tab);
    };

    console.log(active);

    return (
        <div className={styles.categoryTab}>
            <h1
                onClick={() => handleClick('showing')}
                className={clsx(styles.button, active === 'showing' ? styles.active : '')}
            >
                Now Showing
            </h1>
            <VerticalLine width="2px" color="white" />
            <h1
                onClick={() => handleClick('coming')}
                className={clsx(styles.button, active === 'coming' ? styles.active : '')}
            >
                Coming Soon
            </h1>
        </div>
    );
};

export default CategoryTab;
