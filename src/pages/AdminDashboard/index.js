'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AdminDashboard.module.scss';
import { jwtDecode } from 'jwt-decode';
import PopUp from '../../components/PopUp';
import clsx from 'clsx';

const AdminDashboard = ({ activeSectionFromLayout, setActiveSectionFromLayout }) => {
  const currentSection = activeSectionFromLayout || 'dashboard';
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const showPopup = (msg) => {
    setPopupMessage(msg);
    setPopupOpen(true);
  };

  const [formVisible, setFormVisible] = useState(false);
  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState({});
  const [entity, setEntity] = useState('');

  const [skipResetForm, setSkipResetForm] = useState(false);
  const firstRender = useRef(true);

  const [recentFilms, setRecentFilms] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [showtimesData, setShowtimesData] = useState([]);
  const [theatersData, setTheatersData] = useState([]);
  const [promotionsData, setPromotionsData] = useState([]);
  const [cinemasData, setCinemasData] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const [warning, setWarning] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [couplePrice, setCouplePrice] = useState('');
  const [seatType, setSeatType] = useState('regular');
  const [cityOptions, setCityOptions] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const priceInputRef = useRef(null);

  const typeClass = {
    path: styles.pathSeat,
    regular: styles.regularSeat,
    coupleLeft: styles.coupleLeft,
    coupleRight: styles.coupleRight,
  };

  useEffect(() => {
    const fetchData = async (url, setter, errorMsg) => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(errorMsg);
        }

        const data = await res.json();
        setter(data);
      } catch (err) {
        console.error(`Fetch error (${url}):`, err);
      }
    };

    const fetchCities = async () => {
      try {
        const res = await fetch(
          'https://provinces.open-api.vn/api/v2/p/?fbclid=IwY2xjawMWxA1leHRuA2FlbQIxMABicmlkETFsQzVKM2tqUTdYdmRKWHhrAR4BOfVBmcXim21IrDDH5D-oEvsziCYcScOjRyIXttVxDBL4wZAqF06MXj69KA_aem__pa7t-2pZAuF4kFjvUW8mA',
        );
        const data = await res.json();

        const options = data.map((city) => ({
          label: city.name,
          value: city.code,
        }));

        setCityOptions(options);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchData('http://localhost:5003/admin/movies', setRecentFilms, 'Error to fetch movies data!');
    fetchData('http://localhost:5003/admin/users', setUsersData, 'Error to fetch users data!');
    fetchData('http://localhost:5003/admin/cinemas', setCinemasData, 'Error to fetch cinemas data!');
    fetchData('http://localhost:5003/admin/showtimes', setShowtimesData, 'Error to fetch showtimes data!');
    fetchData('http://localhost:5003/admin/theaters', setTheatersData, 'Error to fetch theaters data!');
    fetchData('http://localhost:5003/admin/promotions', setPromotionsData, 'Error to fetch promotions data!');

    fetchCities();
  }, []);

  const statsData = [
    { icon: '🎬', value: recentFilms.length, label: 'Total Films', color: '#ff0000' },
    { icon: '👥', value: usersData.length, label: 'Active Users', color: '#ff3333' },
    { icon: '🎭', value: theatersData.length, label: 'Theaters', color: '#ff6666' },
    { icon: '🎟️', value: promotionsData.length, label: 'Active Promotions', color: '#ff9999' },
  ];

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

  const apiRequest = async ({ url, method = 'GET', body, onSuccess }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (res.ok) {
        const data = await res.json();
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        const err = await res.json();
        alert(err.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      console.error(err);
      showPopup('Cannot access to Server!!!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (entityLabels[entity] === 'Movie') {
      handleSubmitMovie(e);
    } else if (entityLabels[entity] === 'User') {
      handleSubmitUser(e);
    } else if (entityLabels[entity] === 'Cinema') {
      handleSubmitCinema(e);
    } else if (entityLabels[entity] === 'Layout') {
      handleSubmitSeat(e);
    } else {
      console.log('No handler for:', entityLabels[entity]);
    }
  };

  const handleDeleteMovie = (movieID) => {
    apiRequest({
      url: `http://localhost:5003/admin/movies/${movieID}`,
      method: 'DELETE',
      onSuccess: () => {
        setRecentFilms((prev) => prev.filter((m) => m.movieID !== movieID));
        showPopup('Delete Movie successfully!');
      },
    });
  };

  const handleDeleteUser = (userID) => {
    apiRequest({
      url: `http://localhost:5003/admin/users/${userID}`,
      method: 'DELETE',
      onSuccess: () => {
        setUsersData((prev) => prev.filter((u) => u.userID !== userID));
        showPopup('Delete User successfully!');
      },
    });
  };

  const handleDeleteCinema = (cinemaID) => {
    apiRequest({
      url: `http://localhost:5003/admin/cinemas/${cinemaID}`,
      method: 'DELETE',
      onSuccess: () => {
        setUsersData((prev) => prev.filter((c) => c.cinemaID !== cinemaID));
        showPopup('Delete Cinema successfully!');
      },
    });
  };

  const handleDeleteShowtime = (showtimeID) => {
    apiRequest({
      url: `http://localhost:5003/admin/showtimes/${showtimeID}`,
      method: 'DELETE',
      onSuccess: () => {
        setUsersData((prev) => prev.filter((s) => s.showtimeID !== showtimeID));
        showPopup('Delete Showtime successfully!');
      },
    });
  };

  const handleDeleteTheater = (theaterID) => {
    apiRequest({
      url: `http://localhost:5003/admin/theaters/${theaterID}`,
      method: 'DELETE',
      onSuccess: () => {
        setUsersData((prev) => prev.filter((t) => t.theaterID !== theaterID));
        showPopup('Delete Theater successfully!');
      },
    });
  };

  const handleDeletePromotion = (promotionID) => {
    apiRequest({
      url: `http://localhost:5003/admin/promotions/${promotionID}`,
      method: 'DELETE',
      onSuccess: () => {
        setUsersData((prev) => prev.filter((p) => p.promotionID !== promotionID));
        showPopup('Delete Promotion successfully!');
      },
    });
  };

  const handleSubmitMovie = async (e) => {
    e.preventDefault();

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

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/movies',
        method: 'POST',
        body: processedData,
        onSuccess: (newMovie) => {
          setRecentFilms((prev) => [...prev, newMovie]);
          showPopup('Add Movie successfully!');
          closeForm();
        },
      });
    } else {
      apiRequest({
        url: `http://localhost:5003/admin/movies/${formData.movieID}`,
        method: 'PUT',
        body: processedData,
        onSuccess: (editedMovie) => {
          setRecentFilms((prev) =>
            prev.map((m) => (String(m.movieID) === String(editedMovie.movieID) ? editedMovie : m)),
          );
          showPopup('Edit Movie successfully!');
          closeForm();
        },
      });
    }
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/users',
        method: 'POST',
        body: formData,
        onSuccess: (newUser) => {
          setUsersData((prev) => [...prev, newUser]);
          showPopup('Add User successfully!');
          closeForm();
        },
      });
    } else {
      apiRequest({
        url: `http://localhost:5003/admin/users/${formData.userID}`,
        method: 'PUT',
        body: { role: formData.role },
        onSuccess: (editedUser) => {
          setUsersData((prev) => prev.map((u) => (String(u.userID) === String(editedUser.userID) ? editedUser : u)));
          showPopup('Edit User successfully!');
          closeForm();
        },
      });
    }
  };

  const handleSubmitCinema = async (e) => {
    e.preventDefault();

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/cinemas',
        method: 'POST',
        body: formData,
        onSuccess: (newCinema) => {
          setCinemasData((prev) => [...prev, newCinema]);
          showPopup('Add Cinema successfully!');
          closeForm();
        },
      });
    } else {
      apiRequest({
        url: `http://localhost:5003/admin/cinemas/${formData.cinemaID}`,
        method: 'PUT',
        body: formData,
        onSuccess: (editedCinema) => {
          setCinemasData((prev) =>
            prev.map((c) => (String(c.cinemaID) === String(editedCinema.cinemaID) ? editedCinema : c)),
          );
          showPopup('Edit Cinema successfully!');
          closeForm();
        },
      });
    }
  };

  const handleSubmitShowtime = async (e) => {
    e.preventDefault();

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/showtimes',
        method: 'POST',
        body: formData,
        onSuccess: (newShowtime) => {
          setShowtimesData((prev) => [...prev, newShowtime]);
          showPopup('Add Showtime successfully!');
          closeForm();
        },
      });
    } else {
      apiRequest({
        url: `http://localhost:5003/admin/cinemas/${formData.showtimeID}`,
        method: 'PUT',
        body: formData,
        onSuccess: (editedShowtime) => {
          setShowtimesData((prev) =>
            prev.map((s) => (String(s.showtimeID) === String(editedShowtime.showtimeID) ? editedShowtime : s)),
          );
          showPopup('Edit Showtime successfully!');
          closeForm();
        },
      });
    }
  };

  const handleSubmitTheater = async (e) => {
    e.preventDefault();

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/theaters',
        method: 'POST',
        body: formData,
        onSuccess: (newTheater) => {
          setTheatersData((prev) => [...prev, newTheater]);
          showPopup('Add Theater successfully!');
          closeForm();
        },
      });
    } else {
      apiRequest({
        url: `http://localhost:5003/admin/theaters/${formData.theaterID}`,
        method: 'PUT',
        body: formData,
        onSuccess: (editedTheater) => {
          setTheatersData((prev) =>
            prev.map((t) => (String(t.theaterID) === String(editedTheater.theaterID) ? editedTheater : t)),
          );
          showPopup('Edit Theater successfully!');
          closeForm();
        },
      });
    }
  };

  const handleSubmitPromotion = async (e) => {
    e.preventDefault();

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/promotions',
        method: 'POST',
        body: formData,
        onSuccess: (newPromotion) => {
          setPromotionsData((prev) => [...prev, newPromotion]);
          showPopup('Add Promotion successfully!');
          closeForm();
        },
      });
    } else {
      apiRequest({
        url: `http://localhost:5003/admin/promotions/${formData.promotionID}`,
        method: 'PUT',
        body: formData,
        onSuccess: (editedPromotion) => {
          setPromotionsData((prev) =>
            prev.map((p) => (String(p.PromotionID) === String(editedPromotion.promotionID) ? editedPromotion : p)),
          );
          showPopup('Edit Promotion successfully!');
          closeForm();
        },
      });
    }
  };

  const handleSubmitSeat = async (e) => {
    e.preventDefault();

    const combinedData = {
      ...formData,
      seats: seatMatrix,
    };

    console.log(combinedData);

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/seats',
        method: 'POST',
        body: JSON.stringify(combinedData),
        onSuccess: (newSeat) => {
          setSeatsData((prev) => [...prev, newSeat]);
          showPopup('Add Promotion successfully!');
          closeForm();
        },
      });
    } else {
      apiRequest({
        url: `http://localhost:5003/admin/seats/${formData.seatID}`,
        method: 'PUT',
        body: JSON.stringify(combinedData),
        onSuccess: (editedSeat) => {
          setSeatsData((prev) => prev.map((s) => (String(s.seatID) === String(editedSeat.seatID) ? editedSeat : s)));
          showPopup('Edit Seat successfully!');
          closeForm();
        },
      });
    }
  };

  const [seatStep, setSeatStep] = useState(1);
  const [seatMatrix, setSeatMatrix] = useState([]);

  const handleSubmitSeatStep = (e) => {
    e.preventDefault();
    const rows = parseInt(formData.numRow, 10);
    const cols = parseInt(formData.numCol, 10);

    if (!rows || !cols) {
      alert('Vui lòng nhập số dòng/cột hợp lệ!');
      return;
    }
    const matrix = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({
        row: r,
        col: c,
        seatID: null,
        type: 'path',
        price: 0,
      })),
    );

    setSeatMatrix(matrix);
    setSeatStep(2);
  };
  const submitButtonLabels = {
    movies: { add: 'Create', edit: 'Update' },
    users: { add: 'Create', edit: 'Update' },
    seats: { add: 'Next', edit: 'Next' },
    showtimes: { add: 'Save', edit: 'Save' },
  };

  const formConfigs = {
    movies: [
      { name: 'name', label: 'Title', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'language', label: 'Language', type: 'text' },
      { name: 'duration', label: 'Duration', type: 'number' },
      { name: 'releaseDay', label: 'Release Day', type: 'date' },
      { name: 'IMDBrating', label: ' IMDB Rating', type: 'number' },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'directors', label: 'Directors', type: 'text' },
      { name: 'writers', label: 'Writers', type: 'text' },
      { name: 'actors', label: 'Actors', type: 'text' },
      { name: 'ageLimit', label: 'Age Limit', type: 'number' },
      { name: 'posterURL', label: 'Poster', type: 'text' },
      { name: 'backdropURL', label: 'Back Drop', type: 'text' },
      { name: 'trailerURL', label: 'Trailer', type: 'text' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: ['Coming Soon', 'Now Showing', 'Ended'],
      },
    ],
    showtimes: [
      { name: 'movie', label: 'Movie', type: 'text' },
      { name: 'theater', label: 'Theater', type: 'text' },
      { name: 'time', label: 'Time', type: 'time' },
    ],
    addusers: [
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'password', label: 'Password', type: 'text' },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: ['Admin', 'User'],
      },
    ],
    editusers: [
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: ['Admin', 'User'],
      },
    ],
    theaters: [
      { name: 'name', label: 'Theater Name', type: 'text' },
      {
        name: 'cinema',
        label: 'Cinema',
        type: 'select',
        options: cinemasData.map((item) => ({ value: item.cinemaName, label: item.cinemaName })),
      },
    ],
    promotions: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'discount', label: 'Discount', type: 'text' },
    ],
    cinemas: [
      { name: 'cinemaName', label: 'Name', type: 'text' },
      { name: 'address', label: 'Address', type: 'text' },
      {
        name: 'city',
        label: 'City',
        type: 'select',
        options: cityOptions,
      },
      { name: 'phone', label: 'Phone Number', type: 'text' },
    ],
    seats: [
      { name: 'numRow', label: 'Number of rows', type: 'number' },
      { name: 'numCol', label: 'Number of columns', type: 'number' },
    ],
  };

  const entityLabels = {
    movies: 'Movie',
    showtimes: 'Showtime',
    addusers: 'User',
    editusers: 'User',
    theaters: 'Theater',
    promotions: 'Promotion',
    cinemas: 'Cinema',
    seats: 'Layout',
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

  const today = new Date();
  const showingMovies = recentFilms
    .filter((film) => film.releaseDay && new Date(film.releaseDay) < today)
    .sort((a, b) => new Date(b.releaseDay) - new Date(a.releaseDay));
  const latest4Films = showingMovies.slice(0, 4);

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
                    <button className={styles.deleteBtn} onClick={() => handleDeleteMovie(film.movieID)}>
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
                    <button className={styles.deleteBtn} onClick={() => handleDeleteUser(user.userID)}>
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

  const renderCinemaManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Cinema Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'cinemas')}>
          Add New Cinema
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Number of theaters</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cinemasData.map((cinema) => (
              <tr key={cinema.cinemaID}>
                <td style={{ width: '30%' }}>{cinema.cinemaName}</td>
                <td style={{ width: '15%' }}>{cinema.address}</td>
                <td style={{ width: '15%' }}>{cinema.phone}</td>
                <td style={{ width: '15%' }}>{cinemasData.length}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'cinemas', cinema)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDeleteMovie(cinema.cinemaID)}>
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

  const renderSeatManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Seat Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'seats')}>
          Add New Layout
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Layout</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            {cinemasData.map((cinema) => (
              <tr key={cinema.cinemaID}>
                <td style={{ width: '30%' }}>{cinema.cinemaName}</td>
                <td style={{ width: '15%' }}>{cinema.address}</td>
                <td style={{ width: '15%' }}>{cinema.phone}</td>
                <td style={{ width: '15%' }}>{cinemasData.length}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'cinemas', cinema)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDeleteMovie(cinema.cinemaID)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody> */}
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
      case 'cinemas':
        return renderCinemaManagement();
      case 'seats':
        return renderSeatManagement();
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

              {/* Step 1: form nhập rows/columns */}
              {entity !== 'seats' || seatStep === 1 ? (
                <form className={styles.form} onSubmit={entity === 'seats' ? handleSubmitSeatStep : handleSubmit}>
                  {formConfigs[entity]?.map((field) => (
                    <label key={field.name} className={styles.formGroup}>
                      <span className={styles.formLabel}>{field.label}:</span>
                      {field.type === 'select' ? (
                        <select
                          className={styles.formInput}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field, e)}
                          required
                        >
                          <option value="">-- Select --</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className={styles.formInput}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field, e)}
                          required
                        />
                      )}
                    </label>
                  ))}
                  <div className={styles.formActions}>
                    <button className={styles.submitBtn} type="submit">
                      {entity === 'seats' ? 'Next' : formType === 'edit' ? 'Edit' : 'Add'}
                    </button>
                    <button className={styles.cancelBtn} type="button" onClick={closeForm}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : null}

              {entity === 'seats' && seatStep === 2 && seatMatrix.length > 0 && (
                <>
                  <div className={styles.chooseBox}>
                    <select
                      value={seatType}
                      onChange={(e) => {
                        setSeatType(e.target.value);
                        setWarning('');
                      }}
                    >
                      <option value="regular">Regular</option>
                      <option value="couple">Couple</option>
                    </select>
                    <div className={styles.inputWrapper}>
                      <input
                        ref={priceInputRef}
                        placeholder="Enter price"
                        value={seatType === 'regular' ? regularPrice : couplePrice}
                        onChange={(e) => {
                          if (seatType === 'regular') {
                            setRegularPrice(e.target.value);
                          } else {
                            setCouplePrice(e.target.value);
                          }
                          setWarning('');
                        }}
                        className={clsx(styles.formInput, { [styles.inputWarning]: !!warning })}
                      />
                      {warning && <span className={styles.warningText}>{warning}</span>}
                    </div>
                  </div>
                  <div onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)}>
                    <div className={styles.seatMatrix}>
                      {seatMatrix.map((rowArr, rowIndex) => (
                        <div key={rowIndex} className={styles.row}>
                          {rowArr.map((seat, colIndex) => (
                            <button
                              key={colIndex}
                              className={clsx(styles.seatBtn, typeClass[seat.type], {
                                [styles.selected]: seat.type !== null,
                              })}
                              onClick={() => {
                                if (seatType === 'regular' && !regularPrice) {
                                  setWarning('Please enter price for regular seat before choose!');
                                  priceInputRef.current?.focus();
                                  priceInputRef.current?.select();
                                  return;
                                }

                                if (seatType === 'couple' && !couplePrice) {
                                  setWarning('Please enter price for couple seat before choose!');
                                  priceInputRef.current?.focus();
                                  priceInputRef.current?.select();
                                  return;
                                }

                                const newMatrix = seatMatrix.map((row) => [...row]);

                                if (seatType === 'couple') {
                                  const rightSeat = newMatrix[rowIndex][colIndex + 1];

                                  if (seat.type === 'coupleLeft' && rightSeat?.type === 'coupleRight') {
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'path', price: '' };
                                    newMatrix[rowIndex][colIndex + 1] = { ...rightSeat, type: 'path', price: '' };
                                  } else if (
                                    seat.type === 'coupleRight' &&
                                    newMatrix[rowIndex][colIndex - 1]?.type === 'coupleLeft'
                                  ) {
                                    const leftSeat = newMatrix[rowIndex][colIndex - 1];
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'path', price: '' };
                                    newMatrix[rowIndex][colIndex - 1] = { ...leftSeat, type: 'path', price: '' };
                                  } else if (rightSeat && rightSeat.type === 'path') {
                                    // Thêm ghế couple
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'coupleLeft', price: couplePrice };
                                    newMatrix[rowIndex][colIndex + 1] = {
                                      ...rightSeat,
                                      type: 'coupleRight',
                                      price: couplePrice,
                                    };
                                  }
                                } else if (seatType === 'regular') {
                                  // Logic ghế thường
                                  if (seat.type === 'regular') {
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'path', price: '' };
                                  } else {
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'regular', price: regularPrice };
                                  }
                                }

                                setSeatMatrix(newMatrix);
                              }}
                            >
                              {seat.type === 'path'
                                ? 'P'
                                : seat.type === 'regular'
                                ? 'R'
                                : seat.type === 'coupleLeft'
                                ? 'C'
                                : seat.type === 'coupleRight'
                                ? 'P'
                                : ''}
                            </button>
                          ))}
                        </div>
                      ))}
                      <div className={styles.formActions}>
                        <button
                          style={{
                            background: '#007bff',
                            color: '#fff',
                          }}
                          onClick={(e) => {
                            handleSubmitSeat(e);
                            setRegularPrice('');
                            setCouplePrice('');
                            setSeatType('regular');
                            setWarning('');
                          }}
                        >
                          Submit Seats
                        </button>
                        <button
                          onClick={() => {
                            setSeatStep(1);
                            setRegularPrice('');
                            setCouplePrice('');
                            setSeatType('regular');
                            setWarning('');
                          }}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {popupOpen && <PopUp setPosition={'unset'} content={popupMessage} onClick={() => setPopupOpen(false)} />}
    </div>
  );
};

export default AdminDashboard;
