import express from 'express';
import { getUserById, updateUser, getMovieByID } from '../controllers/userController.js';
import { getMovies } from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
// manage user profile
router.get('/profile', verifyToken, getUserById);
router.put('/profile', verifyToken, updateUser);

router.get('/movies', getMovies);
router.get('/movies/:id', getMovieByID)
// router.get('/booking', createBooking);

export default router;