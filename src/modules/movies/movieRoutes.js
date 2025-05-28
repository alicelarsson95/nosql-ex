import express from 'express';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from './movieController.js';
import { verifyToken } from '../../middleware/auth.js';
import { isAdmin } from '../../middleware/isAdmin.js';

const router = express.Router();

// Public routes
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

// Admin-protected routes
router.post('/', verifyToken, isAdmin, createMovie);
router.put('/:id', verifyToken, isAdmin, updateMovie);
router.delete('/:id', verifyToken, isAdmin, deleteMovie);

export default router;
