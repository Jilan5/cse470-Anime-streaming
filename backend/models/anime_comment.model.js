import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    episode: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
    text: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

commentSchema.index({ created_at: -1 }); // This sets the index for sorting in descending order

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
