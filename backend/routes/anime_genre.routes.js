import express from 'express';
const router = express.Router();

import * as genreController from '../controllers/genre.controller.js';

// Routes for CRUD operations on Genre
router.get('/', genreController.getAllGenres);
router.post('/', genreController.createGenre);
router.get('/:id', genreController.getGenreById);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

export default router;