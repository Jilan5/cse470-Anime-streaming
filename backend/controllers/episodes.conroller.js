import Episode from '../models/anime_episode.model.js';

const createEpisode = async (req, res) => {
    const episode = new Episode({
        anime: req.params.id,
        name: req.body.name,
        number: req.body.number,
        video_link: req.body.video_link
    });

    try {
        const newEpisode = await episode.save();
        res.status(201).json(newEpisode);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

const getEpisodesByAnimeId = async (req, res) => {
    try {
        const episodes = await Episode.find({ anime: req.params.id });
        res.json(episodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

export { createEpisode, getEpisodesByAnimeId };