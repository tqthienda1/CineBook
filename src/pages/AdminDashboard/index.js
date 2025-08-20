'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AdminDashboard.module.scss';
import { jwtDecode } from 'jwt-decode';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(entityLabels[entity]);

    if (entityLabels[entity] === 'Movie') {
      handleSubmitMovie(e);
    } else if (entityLabels[entity] === 'User') {
      handleSubmitUser(e);
    } else {
      console.log('Chưa có handler cho:', entityLabels[entity]);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (entityLabels[entity] === 'Movie') {
      handleDeleteMovie();
    } else if (entityLabels[entity] === 'User') {
      handleDeleteUser();
    } else {
      console.log('Chưa có handler cho:', entityLabels[entity]);
    }
  };

  const handleDeleteMovie = async (movieID) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5003/admin/movies/${movieID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setRecentFilms((prev) => prev.filter((m) => m.movieID !== movieID));
      } else {
        const err = await res.json();
        alert(err.message || 'Xóa phim thất bại');
      }
    } catch (err) {
      console.error(err);
      alert('Không kết nối được backend');
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5003/admin/users/${userID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUsersData((prev) => prev.filter((m) => m.userID !== userID));
      } else {
        const err = await res.json();
        alert(err.message || 'Xóa user thất bại');
      }
    } catch (err) {
      console.error(err);
      alert('Không kết nối được backend');
    }
  };

  const handleSubmitMovie = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const arrayFields = ['category', 'directors', 'writers', 'actors'];
      const processedData = { ...formData };

      arrayFields.forEach((field) => {
        if (processedData[field]) {
          if (typeof processedData[field] === 'string') {
            processedData[field] = processedData[field]
              .split(',')
              .map((item) => item.trim())
              .filter((item) => item);
          } else if (Array.isArray(processedData[field])) {
            processedData[field] = processedData[field].map((item) => item.trim());
          }
        }
      });

      console.log(processedData);

      if (formType === 'add') {
        const res = await fetch('http://localhost:5003/admin/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(processedData),
        });

        if (res.ok) {
          const newMovie = await res.json();

          setRecentFilms((prev) => [...prev, newMovie]);
        }
      } else {
        const res = await fetch(`http://localhost:5003/admin/movies/${formData.movieID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(processedData),
        });
        console.log(res);
        if (res.ok) {
          const editedMovie = await res.json();
          console.log(editedMovie);
          setRecentFilms((prev) =>
            prev.map((movie) => (String(movie.movieID) === String(editedMovie.movieID) ? editedMovie : movie)),
          );
        }
      }
    } catch (err) {
      console.error(err);
      alert('Không kết nối được backend');
    }

    closeForm();
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (formType === 'addusers') {
        console.log(JSON.stringify(formData));
        const res = await fetch('http://localhost:5003/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const newUser = await res.json();

          setUsersData((prev) => [...prev, newUser]);
        }
      } else {
        console.log(formData);

        const res = await fetch(`http://localhost:5003/admin/users/${formData.userID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: formData.role }),
        });
        console.log(res);

        const editedUser = await res.json();
        console.log(editedUser);

        if (res.ok) {
          setUsersData((prev) =>
            prev.map((user) => (String(user.userID) === String(editedUser.userID) ? editedUser : user)),
          );
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
      { name: 'status', label: 'Status', type: 'text' },
    ],
    showtimes: [
      { name: 'movie', label: 'Movie', type: 'text' },
      { name: 'theater', label: 'Theater', type: 'text' },
      { name: 'time', label: 'Time', type: 'time' },
    ],
    addusers: [
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'password', label: 'Password', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
    ],
    editusers: [{ name: 'role', label: 'Role', type: 'text' }],
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
    addusers: 'User',
    editusers: 'User',
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

  const handleChange = (field, e) => {
    let value = e.target.value;

    if (field.type === 'number') {
      value = Number(value);
    }

    setFormData({ ...formData, [field.name]: value });
  };

  const [recentFilms, setRecentFilms] = useState([]);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5003/admin/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Lỗi khi lấy danh sách phim');
        }

        const movies = await res.json();
        setRecentFilms(movies);
      } catch (err) {
        console.error('Fetch movies error:', err);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5003/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Lỗi khi lấy danh sách users');
        }
        const users = await res.json();
        setUsersData(users);
      } catch (err) {
        console.error('Fetch movies error:', err);
      }
    };

    fetchMovies();
    fetchUsers();
  }, []);
  const today = new Date();
  const showingMovies = recentFilms
    .filter((film) => film.releaseDay && new Date(film.releaseDay) < today)
    .sort((a, b) => new Date(b.releaseDay) - new Date(a.releaseDay));
  const latest4Films = showingMovies.slice(0, 4);

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
            {latest4Films.map((film) => (
              <div key={film.movieID} className={styles.filmItem}>
                <div className={styles.filmInfo}>
                  <h4>{film.name}</h4>
                  <p>
                    {film.category.join(', ')} • {film.duration} mins
                  </p>
                </div>
                <span className={`${styles.status} ${film.status === 'Showing' ? styles.active : styles.inactive}`}>
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
              }}
            >
              <span>🎟️</span>
              New Promotion
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => {
                setActiveSectionFromLayout('users');
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
        <h2>Movie Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'movies')}>
          Add New Movie
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Release Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentFilms.map((film) => (
              <tr key={film.movieID}>
                <td style={{ width: '40%' }}>{film.name}</td>
                <td style={{ width: '15%' }}>
                  {Array.isArray(film.category) ? film.category.join(', ') : film.category ?? ''}
                </td>
                <td style={{ width: '10%' }}>{film.duration} mins</td>
                <td style={{ width: '10%' }}>{film.releaseDay}</td>
                <td style={{ width: '10%' }}>
                  <span className={`${styles.status} ${film.status === 'Showing' ? styles.active : styles.inactive}`}>
                    {film.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'movies', film)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(film.movieID)}>
                      Delete
                    </button>
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
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'addusers')}>
          Add New User
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.userID}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'editusers', user)}>
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
                {formType.startsWith('add') ? 'Add New ' : 'Edit '} {entityLabels[entity]}
              </h3>
              <form className={styles.form} onSubmit={handleSubmit}>
                {formConfigs[entity]?.map((field) => (
                  <label key={field.name} className={styles.formGroup}>
                    <span className={styles.formLabel}>{field.label}:</span>
                    <input
                      className={styles.formInput}
                      type={field.type}
                      name={field.name}
                      value={
                        Array.isArray(formData[field.name])
                          ? formData[field.name].join(', ')
                          : formData[field.name] || ''
                      }
                      onChange={(e) => handleChange(field, e)}
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
