import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkAdminRole } from '../middlewares/roleMiddleware.js';


import {  getMovies, addMovie, editMovie, deleteMovie, 
          getAllUsers, createUser, updateUser, deleteUser,
          addCinema, getAllCinemas, updateCinema, deleteCinema, getCinemaById,
          addLayoutWithSeats
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

// Các rout quản lý layout
router.post('/layouts', verifyToken, checkAdminRole, addLayoutWithSeats);


export default router;
