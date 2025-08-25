import express from 'express';
import {  getUserById, updateUser,
          getMovieWithCities, getMovieByName,
          getShowtimeForUser, 
          addFavoriteCinema} from '../controllers/userController.js';
import { getMovies, getLayoutWithSeatsByRoomID } from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// manage user profile
router.get('/profile', verifyToken, getUserById);
router.put('/profile', verifyToken, updateUser);
router.put('/favoriteCinema',  verifyToken, addFavoriteCinema)

router.get('/movies', getMovies);
router.get('/movies/search', getMovieByName);
router.get('/movies/:id', getMovieWithCities);

router.get('/showtimes', getShowtimeForUser);
router.get('/layouts/room/:roomID', verifyToken, getLayoutWithSeatsByRoomID)



export default router;