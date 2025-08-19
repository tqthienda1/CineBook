import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { getMovies } from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.get('/movies', getMovies);
// router.get('/booking', createBooking);

export default router;