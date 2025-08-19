import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkAdminRole } from '../middlewares/roleMiddleware.js';

import { getMovies, addMovie, editMovie, deleteMovie } from '../controllers/adminController.js';


const router = express.Router();

router.get('/movies', verifyToken, checkAdminRole, getMovies);
router.post('/movies', verifyToken, checkAdminRole, addMovie);
router.put('/movies/:movieID', verifyToken, checkAdminRole, editMovie);
router.delete('/movies/:movieID', verifyToken, checkAdminRole, deleteMovie);

export default router;
