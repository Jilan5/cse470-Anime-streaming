import mongoose from 'mongoose';

const animeRatingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    anime: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
    rating: { type: Number, default: null } 
});

const AnimeRating = mongoose.model('AnimeRating', animeRatingSchema);

export default AnimeRating;