'use client';

import { useState } from 'react';
import styles from './AdminDashboard.module.scss';
import Modal from 'react-modal';

const AdminDashboard = ({ activeSectionFromLayout, setActiveSectionFromLayout }) => {
  const currentSection = activeSectionFromLayout || 'dashboard';

  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState(''); // 'add' hoặc 'edit'
  const [formData, setFormData] = useState({ title: '', genre: '', duration: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'add') {
      // Thực hiện thêm film mới
    } else {
      // Thực hiện cập nhật film
    }
    closeForm();
  };

  const openForm = (type, data = { title: '', genre: '', duration: '' }) => {
    setFormType(type);
    setFormData(data);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setFormData({ title: '', genre: '', duration: '' });
  };

  const statsData = [
    { icon: '🎬', value: '150+', label: 'Total Films', color: '#ff0000' },
    { icon: '👥', value: '2.5K+', label: 'Active Users', color: '#ff3333' },
    { icon: '🎭', value: '8', label: 'Theaters', color: '#ff6666' },
    { icon: '🎟️', value: '25', label: 'Active Promotions', color: '#ff9999' },
  ];

  const recentFilms = [
    { id: 1, title: 'Avatar: The Way of Water', genre: 'Sci-Fi', duration: '192 min', status: 'Active' },
    { id: 2, title: 'Top Gun: Maverick', genre: 'Action', duration: '130 min', status: 'Active' },
    { id: 3, title: 'Black Panther: Wakanda Forever', genre: 'Action', duration: '161 min', status: 'Inactive' },
    { id: 4, title: 'The Batman', genre: 'Action', duration: '176 min', status: 'Active' },
  ];

  const showtimesData = [
    { id: 1, film: 'Avatar: The Way of Water', theater: 'Theater 1', time: '14:00', status: 'Active' },
    { id: 2, film: 'Top Gun: Maverick', theater: 'Theater 2', time: '16:30', status: 'Active' },
  ];

  const usersData = [
    { id: 1, username: 'admin', role: 'Administrator', status: 'Active' },
    { id: 2, username: 'user123', role: 'User', status: 'Inactive' },
  ];

  const theatersData = [
    { id: 1, name: 'Theater 1', seats: 100, location: 'Building A' },
    { id: 2, name: 'Theater 2', seats: 80, location: 'Building B' },
  ];

  const promotionsData = [
    { id: 1, title: 'Summer Sale', discount: '20%', status: 'Active' },
    { id: 2, title: 'Black Friday', discount: '50%', status: 'Upcoming' },
  ];

  const renderDashboard = () => (
    <div className={styles.dashboardContent}>
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.recentFilms}>
          <h3>Recent Films</h3>
          <div className={styles.filmsList}>
            {recentFilms.map((film) => (
              <div key={film.id} className={styles.filmItem}>
                <div className={styles.filmInfo}>
                  <h4>{film.title}</h4>
                  <p>
                    {film.genre} • {film.duration}
                  </p>
                </div>
                <span className={`${styles.status} ${film.status === 'Active' ? styles.active : styles.inactive}`}>
                  {film.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quickActions}>
          <h3>Quick Actions</h3>
          <div className={styles.actionButtons}>
            <button className={styles.actionBtn} onClick={() => setActiveSectionFromLayout('films')}>
              <span>🎬</span>
              Add New Film
            </button>
            <button className={styles.actionBtn} onClick={() => setActiveSectionFromLayout('showtimes')}>
              <span>🕐</span>
              Create Showtime
            </button>
            <button className={styles.actionBtn} onClick={() => setActiveSectionFromLayout('promotions')}>
              <span>🎟️</span>
              New Promotion
            </button>
            <button className={styles.actionBtn} onClick={() => setActiveSectionFromLayout('users')}>
              <span>👥</span>
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilmManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Film Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add')}>
          Add New Film
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Release Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentFilms.map((film) => (
              <tr key={film.id}>
                <td>{film.title}</td>
                <td>{film.genre}</td>
                <td>{film.duration}</td>
                <td>2023-12-15</td>
                <td>
                  <span className={`${styles.status} ${film.status === 'Active' ? styles.active : styles.inactive}`}>
                    {film.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openForm('edit', film)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGenericSection = (title) => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <button className={styles.primaryBtn}>Add New</button>
      </div>
      <div className={styles.comingSoon}>
        <h3>Coming Soon</h3>
        <p>This section is under development</p>
      </div>
    </div>
  );

  const renderShowtimeManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Showtime Management</h2>
        <button className={styles.primaryBtn}>Create Showtime</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Film</th>
              <th>Theater</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showtimesData.map((showtime) => (
              <tr key={showtime.id}>
                <td>{showtime.film}</td>
                <td>{showtime.theater}</td>
                <td>{showtime.time}</td>
                <td>
                  <span
                    className={`${styles.status} ${showtime.status === 'Active' ? styles.active : styles.inactive}`}
                  >
                    {showtime.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUserAccountManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>User Account Management</h2>
        <button className={styles.primaryBtn}>Add New User</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`${styles.status} ${user.status === 'Active' ? styles.active : styles.inactive}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTheaterSeatManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Theater & Seat Management</h2>
        <button className={styles.primaryBtn}>Add New Theater</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Seats</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theatersData.map((theater) => (
              <tr key={theater.id}>
                <td>{theater.name}</td>
                <td>{theater.seats}</td>
                <td>{theater.location}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPromotionManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Promotion Management</h2>
        <button className={styles.primaryBtn}>Add New Promotion</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotionsData.map((promo) => (
              <tr key={promo.id}>
                <td>{promo.title}</td>
                <td>{promo.discount}</td>
                <td>
                  <span className={`${styles.status} ${promo.status === 'Active' ? styles.active : styles.inactive}`}>
                    {promo.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return renderDashboard();
      case 'films':
        return renderFilmManagement();
      case 'showtimes':
        return renderShowtimeManagement();
      case 'users':
        return renderUserAccountManagement();
      case 'theaters':
        return renderTheaterSeatManagement();
      case 'promotions':
        return renderPromotionManagement();
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      {renderContent()}
      {formVisible && (
        <div className={styles.formBox}>
          <h3>{formType === 'add' ? 'Add New Film' : 'Edit Film'}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </label>
            <label>
              Genre:
              <input
                name="genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                required
              />
            </label>
            <label>
              Duration:
              <input
                name="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </label>
            <div>
              <button type="submit">{formType === 'add' ? 'Create' : 'Update'}</button>
              <button type="button" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
