'use client';
import styles from './AdminLayout.module.scss';
import { useContext, useState } from 'react';
import React from 'react';
import logo from '../../../assets/logo.png';
import { AuthContext } from '../../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RxExit } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'showtimes', label: 'Showtimes', icon: '🕐' },
    { id: 'users', label: 'User Accounts', icon: '👥' },
    { id: 'theaters', label: 'Theaters', icon: '🎭' },
    { id: 'promotions', label: 'Promotions', icon: '🎟️' },
    { id: 'cinemas', label: 'Cinemas', icon: '🎦' },
    { id: 'seats', label: 'Seats', icon: '🎦' },
  ];

  const childrenWithProps = React.cloneElement(children, {
    activeSectionFromLayout: activeSection,
    setActiveSectionFromLayout: setActiveSection,
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
          <span>Admin Panel</span>
        </div>
        <nav className={styles.navigation}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>
            {menuItems.find((item) => item.id === activeSection)?.label || 'Dashboard'}
          </h1>
          <div className={styles.userInfo}>
            <span>Admin User</span>

            <button onClick={handleLogout} className={styles.logoutBtn}>
              <RxExit className={styles.logOutIcon} />
              LOG OUT
            </button>
          </div>
        </header>

        <div className={styles.contentArea}>{childrenWithProps}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
