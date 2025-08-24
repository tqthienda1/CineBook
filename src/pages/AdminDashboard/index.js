'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import styles from './AdminDashboard.module.scss';
import { jwtDecode } from 'jwt-decode';
import PopUp from '../../components/PopUp';
import ShowLayoutDetail from '../../components/ShowLayoutDetail'; // import component mới
import { generateTimeSlots, getAvailableTimeOptions } from '../../components/GenerateTimeSlot';
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
  const [regularPrice, setRegularPrice] = useState();
  const [couplePrice, setCouplePrice] = useState();
  const [seatType, setSeatType] = useState('regular');
  const [cityOptions, setCityOptions] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [showLayoutDetail, setShowLayoutDetail] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);

  const priceInputRef = useRef(null);

  const hasConflict = (newStart, runtime, buffer, existingShowtimes) => {
    const newEnd = newStart + runtime + buffer;

    return existingShowtimes.some((show) => {
      const showStart = show.startTime; // phút (VD: 17:30 => 1050)
      const showEnd = show.startTime + show.runtime + show.buffer;

      return !(newEnd <= showStart || newStart >= showEnd); // overlap
    });
  };

  const baseTimeSlots = useMemo(() => generateTimeSlots({ start: '09:00', end: '23:30', step: 30, format: '12' }), []);

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
        console.log(data);

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
          label: city.name, // cái hiển thị trong dropdown
          value: city.code, // giá trị khi chọn
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
    fetchData('http://localhost:5003/admin/rooms', setTheatersData, 'Error to fetch theaters data!');
    // fetchData('http://localhost:5003/admin/promotions', setPromotionsData, 'Error to fetch promotions data!');
    fetchData('http://localhost:5003/admin/layouts', setSeatsData, 'Error to fetch layouts data!');
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

  const apiRequest = async ({ url, method, body, onSuccess }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: method,
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
    } else if (entityLabels[entity] === 'Room') {
      handleSubmitTheater(e);
    } else if (entityLabels[entity] === 'Showtime') {
      handleSubmitShowtime(e);
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
        setCinemasData((prev) => prev.filter((c) => c.cinemaID !== cinemaID));
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

  const handleDeleteTheater = (roomID) => {
    apiRequest({
      url: `http://localhost:5003/admin/rooms/${roomID}`,
      method: 'DELETE',
      onSuccess: () => {
        setTheatersData((prev) => prev.filter((t) => t.roomID !== roomID));
        showPopup('Delete Room successfully!');
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

  const handleDeleteLayout = (layoutID) => {
    apiRequest({
      url: `http://localhost:5003/admin/layouts/${layoutID}`,
      method: 'DELETE',
      onSuccess: () => {
        setSeatsData((layout) => layout.filter((p) => p.layoutID !== layoutID));
        showPopup('Delete Layout successfully!');
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
    console.log(formData);
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

    const movie = recentFilms.find((m) => String(m.movieID) === String(formData.movie));

    const calculateEndTime = (startTime, duration, buffer = 30) => {
      if (!startTime || !duration) return null;
      const [h, m] = startTime.split(':').map(Number);
      const start = new Date();
      start.setHours(h, m, 0, 0);
      const end = new Date(start.getTime() + (duration + buffer) * 60000);
      return end.toTimeString().slice(0, 8);
    };

    // ---- 1. Generate danh sách ngày hợp lệ
    let dates = [];
    if (formData.dateMode === 'specific') {
      dates = formData.specificDates || [];
    } else if (formData.dateMode === 'weekly') {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const selectedDays = formData.daysOfWeek || []; // ví dụ ["monday","wednesday"]

      const dayMap = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      };

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dayName = Object.keys(dayMap).find((k) => dayMap[k] === d.getDay());
        if (selectedDays.includes(dayName)) {
          dates.push(d.toISOString().split('T')[0]); // format yyyy-mm-dd
        }
      }
    }

    // ---- 2. Generate tất cả suất chiếu (date x timeSlot)
    const newShowtimes = [];
    dates.forEach((date) => {
      (formData.timeSlots || []).forEach((time) => {
        newShowtimes.push({
          movieID: formData.movie,
          cinemaID: formData.cinema,
          roomID: formData.room,
          showDate: date,
          startTime: time,
          endTime: calculateEndTime(time, movie?.duration),
        });
      });
    });

    console.log('Generated Showtimes:', newShowtimes);

    // ---- 3. Gọi API cho từng suất
    if (formType === 'add') {
      for (const payload of newShowtimes) {
        await apiRequest({
          url: 'http://localhost:5003/admin/showtimes',
          method: 'POST',
          body: payload,
          onSuccess: (newShowtime) => {
            setShowtimesData((prev) => [...prev, newShowtime]);
          },
        });
      }
      showPopup('Add Showtimes successfully!');
      closeForm();
    } else {
      const payload = {
        showtimeID: formData.showtimeID,
        movieID: formData.movie,
        cinemaID: formData.cinema,
        roomID: formData.room,
        showDate: formData.specificDates?.[0] || formData.startDate,
        startTime: formData.timeSlots?.[0],
        endTime: calculateEndTime(formData.timeSlots?.[0], movie?.duration),
      };

      apiRequest({
        url: `http://localhost:5003/admin/showtimes/${formData.showtimeID}`,
        method: 'PUT',
        body: payload,
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
    console.log(formData);

    if (formType === 'add') {
      apiRequest({
        url: 'http://localhost:5003/admin/rooms',
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
        url: `http://localhost:5003/admin/rooms/${formData.roomID}`,
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

    // Kết hợp dữ liệu form và seatMatrix
    const combinedData = {
      ...formData,
      seats: seatMatrix,
    };

    console.log('Sending payload:', combinedData);

    // Xác định URL và method dựa vào formType
    const url =
      formType === 'add'
        ? 'http://localhost:5003/admin/layouts'
        : `http://localhost:5003/admin/layouts/${formData.layoutID}`;

    const method = formType === 'add' ? 'POST' : 'PUT';
    // Gọi apiRequest
    apiRequest({
      url,
      method,
      body: combinedData, // để nguyên object, apiRequest sẽ stringify
      onSuccess: (responseData) => {
        if (formType === 'add') {
          setSeatsData((prev) => [...prev, combinedData]);
          showPopup('Add Seat successfully!');
        } else {
          setSeatsData((prev) => {
            const newData = [...prev, combinedData];
            console.log(newData); // in giá trị đã cập nhật
            return newData;
          });
          showPopup('Edit Seat successfully!');
        }
        console.log(seatsData);
        closeForm();
      },
    });
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
        rowNum: r,
        colNum: c,
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
    ],
    showtimes: [
      {
        name: 'movie',
        label: 'Movie',
        type: 'select',
        options: recentFilms.map((m) => ({
          value: m.movieID,
          label: `${m.name} (${m.duration} min)`,
        })),
      },
      {
        name: 'cinema',
        label: 'Cinema',
        type: 'select',
        options: cinemasData.map((c) => ({
          value: c.cinemaID,
          label: c.cinemaName,
        })),
      },
      {
        name: 'room',
        label: 'Screening Room',
        type: 'select',
        options: [],
      },
      {
        name: 'dateMode',
        label: 'Date Selection',
        type: 'radio', // Specific Dates / Weekly Pattern
        options: [
          { value: 'specific', label: 'Specific Dates' },
          { value: 'weekly', label: 'Weekly Pattern' },
        ],
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'date',
      },
      {
        name: 'timeSlots',
        label: 'Time Selection',
        type: 'multi-select', // custom component, hiển thị grid giờ
        options: generateTimeSlots(), // ví dụ 9AM, 10AM, ... 11PM
      },
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
      { name: 'roomName', label: 'Theater Name', type: 'text' },
      { name: 'capacity', label: 'Capacity', type: 'number' },
      {
        name: 'cinemaID',
        label: 'Cinema',
        type: 'select',
        options: cinemasData.map((item) => ({
          value: item.cinemaID,
          label: item.cinemaName,
        })),
      },
      {
        name: 'layoutID',
        label: 'Layout',
        type: 'select',
        options: seatsData.map((item) => ({
          value: item.layoutID,
          label: `Layout ${item.layoutID}`,
        })),
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
    theaters: 'Room',
    promotions: 'Promotion',
    cinemas: 'Cinema',
    seats: 'Layout',
  };

  const closeForm = () => {
    setFormVisible(false);
    setFormData({});
  };

  const openForm = (type, entity, data = null) => {
    setFormType(type);
    setEntity(entity);
    setFormVisible(true);

    if (entity === 'seats') {
      if (type === 'edit' && data) {
        const rows = data.numRow;
        const cols = data.numCol;

        // tạo ma trận từ seats lưu trong DB
        const matrix = [];
        for (let r = 0; r < rows; r++) {
          matrix.push(data.seats.slice(r * cols, (r + 1) * cols));
        }
        setSeatMatrix(matrix);
        setSeatStep(2);

        // 👉 Lấy giá: giả sử regular/couple đều có price
        const allSeats = data.seats;
        const foundRegular = allSeats.find((s) => s.type === 'regular');
        const foundCouple = allSeats.find((s) => s.type === 'coupleLeft');
        // (chỉ lấy 1 trong cặp left/right là đủ)

        if (foundRegular) setRegularPrice(foundRegular.price);
        if (foundCouple) setCouplePrice(foundCouple.price);
      } else {
        setSeatStep(1);
        setSeatMatrix([]);
        setRegularPrice('');
        setCouplePrice('');
      }
    }

    if (entity === 'showtimes' && type === 'edit' && data) {
      setFormData({
        movie: data.movie,
        cinema: data.cinema,
        room: data.room,
        dateMode: 'specific',
        specificDates: data.specificDates,
        timeSlots: data.timeSlots,
        showtimeIDs: data.showtimeIDs, // giữ để biết update record nào
      });
      return;
    }

    setFormData(data || {});
  };

  const handleChange = (field, e) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => {
      if (field.type === 'checkbox-group' || field.type === 'multi-select') {
        const currentValues = Array.isArray(prev[name]) ? prev[name] : [];
        return {
          ...prev,
          [name]: checked ? [...currentValues, value] : currentValues.filter((v) => v !== value),
        };
      }

      if (field.type === 'number') {
        return { ...prev, [name]: Number(value) };
      }

      return {
        ...prev,
        [name]: value,
        ...(field.name === 'cinema' && { room: '' }),
      };
    });
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
                <span
                  className={`${styles.status} ${
                    new Date(film.releaseDay) <= new Date() ? styles.active : styles.inactive
                  }`}
                >
                  {new Date(film.releaseDay) > new Date() ? 'Up Coming' : 'Showing'}
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
                setActiveSectionFromLayout('seats');
                console.log(seatsData);
                openForm('add', 'seats');
              }}
            >
              <span>🎟️</span>
              Add New Layout
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
                <td style={{ width: '35%' }}>{film.name}</td>
                <td style={{ width: '15%' }}>
                  {Array.isArray(film.category) ? film.category.join(', ') : film.category ?? ''}
                </td>
                <td style={{ width: '10%' }}>{film.duration} mins</td>
                <td style={{ width: '10%' }}>{film.releaseDay}</td>
                <td style={{ width: '10%' }}>
                  <span
                    className={`${styles.status} ${
                      new Date(film.releaseDay) <= new Date() ? styles.active : styles.inactive
                    }`}
                  >
                    {new Date(film.releaseDay) > new Date() ? 'Up Coming' : 'Showing'}
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
              <th>Cinema</th>
              <th>Theater</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showtimesData.map((showtime) => (
              <tr key={showtime.showtimeID}>
                <td>{showtime.movieID}</td>
                <td>{showtime.cinemaID}</td>
                <td>{showtime.roomID}</td>
                <td>{showtime.showDate}</td>
                <td>{showtime.startTime}</td>
                <td>{showtime.endTime}</td>
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

  const renderTheaterManagement = () => (
    <div className={styles.sectionContent}>
      <div className={styles.sectionHeader}>
        <h2>Room Management</h2>
        <button className={styles.primaryBtn} onClick={() => openForm('add', 'theaters')}>
          Add New Room
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cinema</th>
              <th>Capacity</th>
              <th>Layout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theatersData.map((room) => (
              <tr key={room.cinemaID}>
                <td style={{ width: '15%' }}>{room.roomName}</td>
                <td style={{ width: '30%' }}>{room.cinemaName}</td>
                <td style={{ width: '15%' }}>{room.capacity}</td>
                <td style={{ width: '15%' }}>{room.layoutID}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button
                      className={styles.editBtn}
                      onClick={() => {
                        openForm('edit', 'theaters', room);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        handleDeleteTheater(room.roomID);
                        console.log(theatersData);
                      }}
                    >
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
              <th>City</th>
              <th>Phone</th>
              <th>Number of theaters</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cinemasData.map((cinema) => (
              <tr key={cinema.cinemaID}>
                <td style={{ width: '20%' }}>{cinema.cinemaName}</td>
                <td style={{ width: '15%' }}>{cinema.address}</td>
                <td style={{ width: '15%' }}>{cinema.city}</td>
                <td style={{ width: '15%' }}>{cinema.phone}</td>
                <td style={{ width: '15%' }}>{theatersData.length}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'cinemas', cinema)}>
                      Edit
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        handleDeleteCinema(cinema.cinemaID);
                        console.log(cinemasData);
                      }}
                    >
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
              <th>Rows</th>
              <th>Columns</th>
              <th>Layout Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {seatsData.map((seat) => (
              <tr key={seat.layoutID}>
                <td style={{ width: '30%' }}>{seat.layoutID}</td>
                <td style={{ width: '15%' }}>{seat.numRow}</td>
                <td style={{ width: '15%' }}>{seat.numCol}</td>
                <td>
                  <td>
                    <td>
                      <td>
                        <button
                          className={clsx(styles.status, styles.active)}
                          onClick={() => {
                            setSelectedLayout(seat);
                            setShowLayoutDetail(true);
                          }}
                        >
                          Show Layout
                        </button>
                      </td>
                    </td>
                  </td>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => openForm('edit', 'seats', seat)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDeleteLayout(seat.layoutID)}>
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
        return renderTheaterManagement();
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
              {entity !== 'seats' || seatStep === 1 ? (
                <form className={styles.form} onSubmit={entity === 'seats' ? handleSubmitSeatStep : handleSubmit}>
                  {formConfigs[entity]?.map((field) => {
                    // Ẩn/hiện field theo dateMode (chỉ áp dụng cho showtimes)
                    if (entity === 'showtimes') {
                      if (
                        formData.dateMode === 'specific' &&
                        (field.name === 'startDate' || field.name === 'endDate')
                      ) {
                        return null;
                      }
                      if (formData.dateMode === 'weekly' && field.name === 'specificDates') {
                        return null;
                      }
                    }

                    // Chuẩn bị options động (lọc conflict cho timeSlots)
                    const options =
                      field.name === 'timeSlots'
                        ? getAvailableTimeOptions({
                            formData,
                            baseSlots: baseTimeSlots,
                            recentFilms, // 👈 truyền đúng vào đây
                            showtimesData,
                            defaultBuffer: 30,
                          })
                        : field.options;
                    return (
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

                            {field.name === 'room'
                              ? theatersData
                                  .filter((r) => String(r.cinemaID) === String(formData.cinema))
                                  .map((r) => (
                                    <option key={r.roomID} value={r.roomID}>
                                      {`${r.roomName} (${r.capacity} seats)`}
                                    </option>
                                  ))
                              : options?.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                          </select>
                        ) : field.type === 'radio' ? (
                          <>
                            <div className={styles.radioGroup}>
                              {field.options?.map((opt) => (
                                <label key={opt.value} className={styles.radioOption}>
                                  <input
                                    type="radio"
                                    name={field.name}
                                    value={opt.value}
                                    checked={formData[field.name] === opt.value}
                                    onChange={(e) => handleChange(field, e)}
                                  />
                                  {opt.label}
                                </label>
                              ))}
                            </div>

                            {/* 👇 nếu chọn Weekly Pattern → hiện checkbox thứ trong tuần */}
                            {formData[field.name] === 'weekly' && (
                              <div className={styles.checkboxGroup}>
                                {[
                                  { value: 'monday', label: 'Monday' },
                                  { value: 'tuesday', label: 'Tuesday' },
                                  { value: 'wednesday', label: 'Wednesday' },
                                  { value: 'thursday', label: 'Thursday' },
                                  { value: 'friday', label: 'Friday' },
                                  { value: 'saturday', label: 'Saturday' },
                                  { value: 'sunday', label: 'Sunday' },
                                ].map((opt) => (
                                  <label key={opt.value} className={styles.checkboxOption}>
                                    <input
                                      type="checkbox"
                                      name="daysOfWeek"
                                      value={opt.value}
                                      checked={formData.daysOfWeek?.includes(opt.value)}
                                      onChange={(e) => handleChange({ name: 'daysOfWeek', type: 'checkbox-group' }, e)}
                                    />
                                    {opt.label}
                                  </label>
                                ))}
                              </div>
                            )}

                            {/* 👇 nếu chọn Specific Dates → hiện input chọn nhiều ngày */}
                            {formData[field.name] === 'specific' && (
                              <div className={styles.specificDates}>
                                <input
                                  type="date"
                                  className={styles.formInput}
                                  onChange={(e) => {
                                    const newDate = e.target.value;
                                    if (newDate && !formData.specificDates?.includes(newDate)) {
                                      handleChange(
                                        { name: 'specificDates', type: 'multi-select' },
                                        {
                                          target: {
                                            value: newDate,
                                            checked: true,
                                            name: 'specificDates',
                                          },
                                        },
                                      );
                                    }
                                  }}
                                />
                                <div className={styles.selectedDates}>
                                  {formData.specificDates?.map((d) => (
                                    <span key={d} className={styles.dateTag}>
                                      {d}
                                      <button
                                        type="button"
                                        className={styles.removeDateBtn}
                                        onClick={() =>
                                          handleChange(
                                            { name: 'specificDates', type: 'multi-select' },
                                            {
                                              target: {
                                                value: d,
                                                checked: false,
                                                name: 'specificDates',
                                              },
                                            },
                                          )
                                        }
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        ) : field.type === 'multi-select' ? (
                          <div className={styles.multiSelectGrid}>
                            {options?.map((opt) => (
                              <label
                                key={opt.value}
                                className={`${styles.multiSelectOption} ${
                                  formData[field.name]?.includes(opt.value) ? styles.selected : ''
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  name={field.name}
                                  value={opt.value}
                                  checked={formData[field.name]?.includes(opt.value)}
                                  onChange={(e) => handleChange(field, e)}
                                />
                                {opt.label}
                              </label>
                            ))}
                          </div>
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
                    );
                  })}
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
                          const value = e.target.value;

                          // Kiểm tra nếu value là số hợp lệ
                          if (!isNaN(value) && value !== '') {
                            const numberValue = Number(value);
                            if (seatType === 'regular') {
                              setRegularPrice(numberValue);
                            } else {
                              setCouplePrice(numberValue);
                            }
                            setWarning('');
                          } else {
                            // Nếu nhập chữ, reset về 0 hoặc giữ giá trị cũ
                            if (seatType === 'regular') {
                              setRegularPrice('');
                            } else {
                              setCouplePrice('');
                            }
                            setWarning('Chỉ được nhập số');
                          }
                        }}
                        className={clsx(styles.formInput, { [styles.inputWarning]: !!warning })}
                      />
                      {warning && <span className={styles.warningText}>{warning}</span>}
                    </div>
                  </div>
                  <div
                    style={{ 'justify-content': 'center' }}
                    onMouseDown={() => setIsMouseDown(true)}
                    onMouseUp={() => setIsMouseDown(false)}
                  >
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
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'path', price: 0 };
                                    newMatrix[rowIndex][colIndex + 1] = { ...rightSeat, type: 'path', price: 0 };
                                  } else if (
                                    seat.type === 'coupleRight' &&
                                    newMatrix[rowIndex][colIndex - 1]?.type === 'coupleLeft'
                                  ) {
                                    const leftSeat = newMatrix[rowIndex][colIndex - 1];
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'path', price: 0 };
                                    newMatrix[rowIndex][colIndex - 1] = { ...leftSeat, type: 'path', price: 0 };
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
                                    newMatrix[rowIndex][colIndex] = { ...seat, type: 'path', price: 0 };
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
                        <button
                          style={{ background: '#f44336', color: '#fff' }}
                          onClick={() => {
                            // Reset toàn bộ về path
                            const cleared = seatMatrix.map((row) =>
                              row.map((seat) => ({ ...seat, type: 'path', price: 0 })),
                            );
                            setSeatMatrix(cleared);
                          }}
                        >
                          Clear
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
      {/* Show layout detail (luôn được render riêng) */}
      {showLayoutDetail && selectedLayout && (
        <ShowLayoutDetail layout={selectedLayout} onClose={() => setShowLayoutDetail(false)} />
      )}
      {popupOpen && <PopUp setPosition={'unset'} content={popupMessage} onClick={() => setPopupOpen(false)} />}
    </div>
  );
};

export default AdminDashboard;
