import express from 'express';
import {  getUserById, updateUser,
          getMovieWithCities, getMovieByName,
          getShowtimeForUser } from '../controllers/userController.js';
import { getMovies } from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// manage user profile
router.get('/profile', verifyToken, getUserById);
router.put('/profile', verifyToken, updateUser);

router.get('/movies', getMovies);
router.get('/movies/search', getMovieByName);
router.get('/movies/:id', getMovieWithCities);

router.get('/showtimes', getShowtimeForUser);

export default router;