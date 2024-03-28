import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
    anime: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
    name: { type: String, required: true },
    number: { type: Number, default: null },
    release_date: { type: Date, required: true },
    video_link: { type: String, default: null }
});

const Episode = mongoose.model('Episode', episodeSchema);

export default Episode;