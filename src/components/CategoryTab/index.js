import styles from './CategoryTab.module.scss';
import VerticalLine from '../VerticalLine';
import clsx from 'clsx';
import { useState } from 'react';
import Tab from '../Tab';

const CategoryTab = () => {
    const [active, setActive] = useState('showing');

    const handleClick = (tab) => {
        setActive(tab);
    };

    return (
        <div className={styles.categoryTab}>
            <Tab turnActive={active === 'showing'} onClick={() => handleClick('showing')} className={styles.tab}>
                Now Showing
            </Tab>
            <VerticalLine width="2px" color="white" />

            <Tab turnActive={active === 'coming'} onClick={() => handleClick('coming')} className={styles.tab}>
                Coming Soon
            </Tab>
        </div>
    );
};

export default CategoryTab;
