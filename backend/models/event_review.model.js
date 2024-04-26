import mongoose from 'mongoose';
const {Schema} = mongoose;

const reviewSchema = new Schema({
    username: { type: String },
    userid: { type: String},
    event: { type: String},
    text: { type: String }
});
const Review = mongoose.model('Review', reviewSchema);

export default Review;
