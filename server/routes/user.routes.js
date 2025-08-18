import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// route này cần đăng nhập mới truy cập
router.get('/profile', verifyToken, getProfile);

// router.get('/movies', getMovies);
// router.get('/booking', createBooking);

export default router;