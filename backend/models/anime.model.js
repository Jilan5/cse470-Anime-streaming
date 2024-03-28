import mongoose from 'mongoose';

const { Schema } = mongoose;

const animeSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, default: 'avatar.svg' }, // Assuming you'll store the image path
    studio: { type: String, required: true },
    release_date: { type: Number, required: true },
    views: { type: Number, default: 0 },
    description: { type: String, required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }], // Assuming Genre is another Mongoose model

    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, default: 0 }
    }]
});

const Anime = mongoose.model('Anime', animeSchema);

export default Anime;