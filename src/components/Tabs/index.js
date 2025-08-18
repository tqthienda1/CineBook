import React, { useContext, useState } from 'react';
import styles from './Tabs.module.scss';
import { RxExit } from 'react-icons/rx';
import clsx from 'clsx';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ activeTab, setActiveTab }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <h1>Profile</h1>
        <button
          className={clsx(styles.button, activeTab === 'general' ? styles.active : '')}
          onClick={() => setActiveTab('general')}
        >
          General Information
        </button>
        <button
          className={clsx(styles.button, activeTab === 'purchase' ? styles.active : '')}
          onClick={() => setActiveTab('purchase')}
        >
          Purchase History
        </button>
      </div>

      <button onClick={handleLogout} className={styles.logOutButton}>
        <RxExit className={styles.logOutIcon} />
        LOG OUT
      </button>
    </div>
  );
};

export default Tabs;
