import Anime from '../models/anime.model.js';
import Comment from '../models/anime_comment.model.js';

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

// Function to favorite an anime
const favoriteAnime = async (req, res) => {
    const { id } = req.params;
  
    try {
        const anime = await Anime.findById(id);
        if (!anime) {
            return res.status(404).json({ message: 'Anime not found' });
        }
  
        if (!anime.favorites.includes(id)) {
            anime.favorites.push(id);
            await anime.save();
            return res.status(200).json({ message: 'Anime favorited successfully' });
        } else {
            return res.status(400).json({ message: 'Anime already favorited' });
        }
    } catch (error) {
        console.error('Error favoriting anime:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  //Function to unfavorite an anime
  const unfavoriteAnime = async (req, res) => {
    const { id } = req.params;
  
    try {
        const anime = await Anime.findById(id);
        if (!anime) {
            return res.status(404).json({ message: 'Anime not found' });
        }
  
        const stringId = String(id); // Convert id to string for accurate comparison

      if (anime.favorites.includes(stringId)) {
          anime.favorites = anime.favorites.filter((favId) => String(favId) !== stringId);
          await anime.save();
          return res.status(200).json({ message: 'Anime unfavorited successfully' });
      } else {
          return res.status(400).json({ message: 'Anime is not favorited' });
      }
  } catch (error) {
      console.error('Error unfavoriting anime:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};



const createComment = async (req, res) => {
    
    const comment = new Comment({
        username: req.body.username,
        userid: req.body.userid,
        anime: req.params.id,
        text: req.body.text
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getCommentsByAnimeId = async (req, res) => {
    try {
        const comments = await Comment.find({ anime: req.params.id });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export {
    getAllAnime,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime,
    favoriteAnime,
    unfavoriteAnime,
    createComment,
    getCommentsByAnimeId
}
