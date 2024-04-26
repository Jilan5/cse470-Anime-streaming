import mongoose from 'mongoose';
const {Schema} = mongoose;

const commentSchema = new Schema({
    username: { type: String },
    userid: { type: String},
    anime: { type: String},
    text: { type: String }
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
