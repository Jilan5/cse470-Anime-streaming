import express from 'express';
const router = express.Router();
import * as episodeController from '../controllers/episodes.conroller.js';
// Routes for episodes
router.get('/:id', episodeController.getEpisodesByAnimeId);
router.post('/:id', episodeController.createEpisode);


export default router;