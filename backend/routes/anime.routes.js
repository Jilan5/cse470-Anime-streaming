import express from 'express';
const router = express.Router();
import * as animeController from '../controllers/anime.controller.js';


// Routes for CRUD operations on anime

router.get('/', animeController.getAllAnime);
router.post('/', animeController.createAnime);
router.get('/:id', animeController.getAnimeById);
router.put('/:id', animeController.updateAnime);
router.delete('/:id', animeController.deleteAnime);

// Routes for favorite anime
router.post('/favorite/add', animeController.addToFavorites);
router.post('/favorite/remove', animeController.removeFromFavorites);



export default router;