import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { checkAdminRole } from '../middlewares/roleMiddleware.js';
import { addMovie } from '../controllers/adminController.js';
const router = express.Router();

// router.get('/admin/movies', verifyToken, checkAdminRole, getMovies);
router.post('/movies', verifyToken, checkAdminRole, addMovie);
// router.put('/admin/movies/:id', verifyToken, checkAdminRole, updateMovie);
// router.delete('/admin/movies/:id', verifyToken, checkAdminRole, deleteMovie); 

export default router;