import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
    anime: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: Number, default: null },
    release_date: { type: Date, default: Date.now},
    video_link: { type: String, default: null }
});

const Episode = mongoose.model('Episode', episodeSchema);

export default Episode;