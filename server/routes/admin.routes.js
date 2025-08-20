import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkAdminRole } from '../middlewares/roleMiddleware.js';


import { getMovies, addMovie, editMovie, deleteMovie, getAllUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/movies', verifyToken, checkAdminRole, getMovies);
router.post('/movies', verifyToken, checkAdminRole, addMovie);
router.put('/movies/:movieID', verifyToken, checkAdminRole, editMovie);
router.delete('/movies/:movieID', verifyToken, checkAdminRole, deleteMovie);

// Các route cho quản lý người dùng
router.get('/users', verifyToken, checkAdminRole, getAllUsers);
router.post('/users', verifyToken, checkAdminRole, registerUser);
router.put('/users/:userID', verifyToken, checkAdminRole, updateUser);
router.delete('/users/:userID', verifyToken, checkAdminRole, deleteUser);

export default router;
