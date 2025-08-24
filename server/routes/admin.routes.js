import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkAdminRole } from '../middlewares/roleMiddleware.js';


import {  getMovies, addMovie, editMovie, deleteMovie, 
          getAllUsers, createUser, updateUser, deleteUser,
          addCinema, getAllCinemas, updateCinema, deleteCinema, getCinemaById,
          addLayoutWithSeats, getLayoutWithSeats, deleteLayoutWithSeats, getAllLayouts, updateLayoutWithSeats, getLayoutWithSeatsByRoomID,
          addRoom, getRoomByID, deleteRoom, updateRoom, getAllRoom,
          addShowtime, getAllShowtime, deleteShowtime, getShowtimeByRoomID, updateShowtime,
        } from '../controllers/adminController.js';


const router = express.Router();

router.get('/movies', verifyToken, checkAdminRole, getMovies);
router.post('/movies', verifyToken, checkAdminRole, addMovie);
router.put('/movies/:movieID', verifyToken, checkAdminRole, editMovie);
router.delete('/movies/:movieID', verifyToken, checkAdminRole, deleteMovie);

// Các route cho quản lý người dùng
router.get('/users', verifyToken, checkAdminRole, getAllUsers);
router.post('/users', verifyToken, checkAdminRole, createUser);
router.put('/users/:userID', verifyToken, checkAdminRole, updateUser);
router.delete('/users/:userID', verifyToken, checkAdminRole, deleteUser);

// Các route quản lý cinema
router.post('/cinemas', verifyToken, checkAdminRole, addCinema);
router.get('/cinemas', verifyToken, checkAdminRole, getAllCinemas);
router.get('/cinemas/:cinemaID', verifyToken, checkAdminRole, getCinemaById);
router.put('/cinemas/:cinemaID', verifyToken, checkAdminRole, updateCinema);
router.delete('/cinemas/:cinemaID', verifyToken, checkAdminRole, deleteCinema);

// Các route quản lý layout
router.get('/layouts', verifyToken, checkAdminRole, getAllLayouts);
router.post('/layouts', verifyToken, checkAdminRole, addLayoutWithSeats);
router.get('/layouts/room/:roomID', verifyToken, checkAdminRole, getLayoutWithSeatsByRoomID);
router.get('/layouts/:layoutID', verifyToken, checkAdminRole, getLayoutWithSeats);
router.delete('/layouts/:layoutID', verifyToken, checkAdminRole, deleteLayoutWithSeats);
router.put('/layouts/:layoutID', verifyToken, checkAdminRole, updateLayoutWithSeats);

// Các route quản lý room
router.post('/rooms', verifyToken, checkAdminRole, addRoom);
router.get('/rooms', verifyToken, checkAdminRole, getAllRoom);
router.get('/rooms/:roomID', verifyToken, checkAdminRole, getRoomByID);
router.delete('/rooms/:roomID', verifyToken, checkAdminRole, deleteRoom);
router.put('/rooms/:roomID', verifyToken, checkAdminRole, updateRoom);

// Các route quản lý showtime
router.post('/showtimes', verifyToken, checkAdminRole, addShowtime);
router.get('/showtimes', verifyToken, checkAdminRole, getAllShowtime);
router.get('/showtimes/room/:roomID', verifyToken, checkAdminRole, getShowtimeByRoomID);
router.delete('/showtimes/:showtimeID', verifyToken, checkAdminRole, deleteShowtime);
router.put('/showtimes/:showtimeID', verifyToken, checkAdminRole, updateShowtime);
export default router;
