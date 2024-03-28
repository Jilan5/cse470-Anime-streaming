import Genre from '../models/genre.model.js';

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createGenre = async (req, res) => {
    const { name } = req.body;
    const newGenre = new Genre({ name });

    try {
        const savedGenre = await newGenre.save();
        res.status(201).json(savedGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateGenre = async (req, res) => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteGenre = async (req, res) => {
    try {
        await Genre.findByIdAndDelete(req.params.id);
        res.json({ message: 'Genre deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export  {
    getAllGenres,
    createGenre,
    getGenreById,
    updateGenre,
    deleteGenre
};