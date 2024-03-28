import Anime from '../models/anime.model.js';

// Function to get all anime
const getAllAnime = async (req, res) => {
    try {
        const animeList = await Anime.find();
        res.json(animeList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to get a single anime by ID
const getAnimeById = async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id);
        if (anime == null) {
            return res.status(404).json({ message: 'Anime not found' });
        }
        res.json(anime);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to create a new anime
const createAnime = async (req, res) => {
    const anime = new Anime({
        name: req.body.name,
        image: req.body.image,
        studio: req.body.studio,
        release_date: req.body.release_date,
        views: req.body.views,
        description: req.body.description,
        genres: req.body.genres
    });

    try {
        const newAnime = await anime.save();
        res.status(201).json(newAnime);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function to update an existing anime
const updateAnime = async (req, res) => {
    try {
        const updatedAnime = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAnime);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function to delete an anime
const deleteAnime = async (req, res) => {
    try {
        await Anime.findByIdAndDelete(req.params.id);
        res.json({ message: 'Anime deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllAnime,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime
}
