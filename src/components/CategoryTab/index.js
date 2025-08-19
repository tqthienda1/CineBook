import styles from './CategoryTab.module.scss';
import VerticalLine from '../VerticalLine';
import { useState } from 'react';
import Tab from '../Tab';

const CategoryTab = ({ active, onChange }) => {
  return (
    <div className={styles.categoryTab}>
      <Tab turnActive={active === 'showing'} onClick={() => onChange('showing')} className={styles.tab}>
        Now Showing
      </Tab>
      <VerticalLine width="2px" color="white" />
      <Tab turnActive={active === 'coming'} onClick={() => onChange('coming')} className={styles.tab}>
        Coming Soon
      </Tab>
    </div>
  );
};

export default CategoryTab;
