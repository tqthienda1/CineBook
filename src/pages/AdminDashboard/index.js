'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AdminDashboard.module.scss';

const AdminDashboard = ({ activeSectionFromLayout, setActiveSectionFromLayout }) => {
  const currentSection = activeSectionFromLayout || 'dashboard';

  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState(''); // 'add' hoặc 'edit'
  const [formData, setFormData] = useState({});
  const [entity, setEntity] = useState('');

  const [skipResetForm, setSkipResetForm] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!skipResetForm) {
      setFormVisible(false);
      setFormType('');
      setFormData({});
    }
  }, [currentSection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (formType === 'add') {
        console.log(JSON.stringify(formData));
        const res = await fetch('http://localhost:5003/admin/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
          setRecentFilms((prev) => [...prev, data.film]);
        } else {
          alert('Lỗi: ' + data.message);
        }
      } else {
        const res = await fetch(`http://localhost:5003/admin/movies/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
          setRecentFilms((prev) => prev.map((film) => (film.id === formData.id ? data.film : film)));
        } else {
          alert('Lỗi: ' + data.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Không kết nối được backend');
    }

    closeForm();
  };

  const formConfigs = {
    movies: [
      { name: 'name', label: 'Title', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'language', label: 'Language', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'text' },
      { name: 'releaseDay', label: 'Release Day', type: 'date' },
      { name: 'IMDBrating', label: ' IMDB Rating', type: 'number' },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'directors', label: 'Directors', type: 'text' },
      { name: 'writers', label: 'Writers', type: 'text' },
      { name: 'actors', label: 'Actors', type: 'text' },
      { name: 'ageLimit', label: 'Age Limit', type: 'number' },
      { name: 'posterURL', label: 'Poster', type: 'text' },
      { name: 'backdropURL', label: 'Back Drop', type: 'text' },
    ],
    showtimes: [
      { name: 'movie', label: 'Movie', type: 'text' },
      { name: 'theater', label: 'Theater', type: 'text' },
      { name: 'time', label: 'Time', type: 'time' },
    ],
    users: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
    ],
    theaters: [
      { name: 'name', label: 'Theater Name', type: 'text' },
      { name: 'seats', label: 'Seats', type: 'number' },
      { name: 'location', label: 'Location', type: 'text' },
    ],
    promotions: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'discount', label: 'Discount', type: 'text' },
    ],
  };

  const entityLabels = {
    movies: 'Movie',
    showtimes: 'Showtime',
    users: 'User',
    theaters: 'Theater',
    promotions: 'Promotion',
  };

  const closeForm = () => {
    setFormVisible(false);
    setFormData({});
  };

  const openForm = (type, entityName, data = {}) => {
    setFormType(type);
    setEntity(entityName);
    setFormData(data);
    setFormVisible(true);
  };

  const [recentFilms, setRecentFilms] = useState([
    {
      id: 1,
      name: 'Avatar: The Way of Water',
      category: 'Sci-Fi',
      language: 'asdsadsad',
      duration: '192 min',
      releaseDay: '10/10/2020',
      IMDBrating: '8.9',
      description: 'Phim hay nhất mọi thời đại',
      directors: 'Trần Quốc Thiện',
      writers: 'Ngô Bảo Long',
      actors: 'Nguyễn Đặng Đức Thịnh',
      ageLimit: '18',
      posterURL: 'posterURL',
      backdropURL: 'backdropURL',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Top Gun: Maverick',
      category: 'Action',
      language: 'asdsadsad',
      duration: '130 min',
      releaseDay: '10/10/2020',
      IMDBrating: '8.9',
      description: 'Phim hay nhất mọi thời đại',
      directors: 'Trần Quốc Thiện',
      writers: 'Ngô Bảo Long',
      actors: 'Nguyễn Đặng Đức Thịnh',
      ageLimit: '18',
      posterURL: 'posterURL',
      backdropURL: 'backdropURL',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Black Panther: Wakanda Forever',
      category: 'Action',
      language: 'asdsadsad',
      duration: '161 min',
      releaseDay: '10/10/2020',
      IMDBrating: '8.9',
      description: 'Phim hay nhất mọi thời đại',
      directors: 'Trần Quốc Thiện',
      writers: 'Ngô Bảo Long',
      actors: 'Nguyễn Đặng Đức Thịnh',
      ageLimit: '18',
      posterURL: 'posterURL',
      backdropURL: 'backdropURL',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'The Batman',
      category: 'Action',
      language: 'asdsadsad',
      duration: '176 min',
      releaseDay: '10/10/2020',
      IMDBrating: '8.9',
      description: 'Phim hay nhất mọi thời đại',
      directors: 'Trần Quốc Thiện',
      writers: 'Ngô Bảo Long',
      actors: 'Nguyễn Đặng Đức Thịnh',
      ageLimit: '18',
      posterURL: 'posterURL',
      backdropURL: 'backdropURL',
      status: 'Inactive',
    },
  ]);

  const [statsData, setStatsData] = useState([
    { icon: '🎬', value: '150+', label: 'Total Films', color: '#ff0000' },
    { icon: '👥', value: '2.5K+', label: 'Active Users', color: '#ff3333' },
    { icon: '🎭', value: '8', label: 'Theaters', color: '#ff6666' },
    { icon: '🎟️', value: '25', label: 'Active Promotions', color: '#ff9999' },
  ]);

  const [showtimesData, setShowtimesData] = useState([
    { id: 1, movie: 'Avatar: The Way of Water', theater: 'Theater 1', time: '14:00', status: 'Active' },
    { id: 2, movie: 'Top Gun: Maverick', theater: 'Theater 2', time: '16:30', status: 'Active' },
  ]);

  const [usersData, setUsersData] = useState([
    { id: 1, username: 'admin', role: 'Administrator', status: 'Active' },
    { id: 2, username: 'user123', role: 'User', status: 'Inactive' },
  ]);

  const [theatersData, setTheatersData] = useState([
    { id: 1, name: 'Theater 1', seats: 100, location: 'Building A' },
    { id: 2, name: 'Theater 2', seats: 80, location: 'Building B' },
  ]);

  const [promotionsData, setPromotionsData] = useState([
    { id: 1, title: 'Summer Sale', discount: '20%', status: 'Active' },
    { id: 2, title: 'Black Friday', discount: '50%', status: 'Upcoming' },
  ]);

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
          <h3>Recent Movies</h3>
          <div className={styles.filmsList}>
            {recentFilms.map((film) => (
              <div key={film.id} className={styles.filmItem}>
                <div className={styles.filmInfo}>
                  <h4>{film.name}</h4>
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
            <button
              className={styles.actionBtn}
              onClick={() => {
                setSkipResetForm(true);
                setActiveSectionFromLayout('movies');
                openForm('add', 'movies');
                setTimeout(() => setSkipResetForm(false), 0);
              }}
            >
              <span>🎬</span>
              Add New Movie
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => {
                setSkipResetForm(true);
                setActiveSectionFromLayout('showtimes');
                openForm('add', 'showtimes');
                setTimeout(() => setSkipResetForm(false), 0);
              }}
            >
              <span>🕐</span>
              Create Showtime
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => {
                setSkipResetForm(true);
                setActiveSectionFromLayout('promotions');
                openForm('add', 'promotions');
                setTimeout(() => setSkipResetForm(false), 0);
              }}
            >
              <span>🎟️</span>
              New Promotion
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => {
                // setSkipResetForm(true);
                setActiveSectionFromLayout('users');
                // openForm('add', 'users');
              }}
            >
              <span>👥</span>
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMovieManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Film Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'movies')}>
          Add New Movie
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
                <td>{film.name}</td>
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
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'movies', film)}>
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

  const renderGenericSection = (title) => {
    closeForm();
    return (
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
  };

  const renderShowtimeManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Showtime Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'showtimes')}>
          Create Showtime
        </button>
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
                <td>{showtime.movie}</td>
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
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'showtimes', showtime)}>
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

  const renderUserAccountManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>User Account Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'users')}>
          Add New User
        </button>
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
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'users', user)}>
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

  const renderTheaterSeatManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Theater & Seat Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'theaters')}>
          Add New Theater
        </button>
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
                    <button className={styles.editBtn} onClick={() => openForm('add', 'theaters', theater)}>
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

  const renderPromotionManagement = () => (
    // closeForm();
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Promotion Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'promotions')}>
          Add New Promotion
        </button>
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
                    <button className={styles.editBtn} onClick={() => openForm('add', 'promotions', promo)}>
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

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return renderDashboard();
      case 'movies':
        return renderMovieManagement();
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
    <div>
      <div>{renderContent()}</div>
      <div>
        {formVisible && entity && (
          <div className={styles.overlay}>
            <div className={styles.formBox}>
              <h3 className={styles.formTitle}>
                {formType === 'add' ? 'Add New ' : 'Edit '}
                {entityLabels[entity]}
              </h3>
              <form className={styles.form} onSubmit={handleSubmit}>
                {formConfigs[entity]?.map((field) => (
                  <label key={field.name} className={styles.formGroup}>
                    <span className={styles.formLabel}>{field.label}:</span>
                    <input
                      className={styles.formInput}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      required
                    />
                  </label>
                ))}
                <div className={styles.formActions}>
                  <button className={styles.submitBtn} type="submit">
                    {formType === 'add' ? 'Create' : 'Update'}
                  </button>
                  <button className={styles.cancelBtn} type="button" onClick={closeForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
