import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, default: 'avatar.svg' }, // Assuming you'll store the image path
    event_date: { type: Date, required: true },
    description: { type: String, required: true },
    fee: { type: String, required: true }

});

const Event = mongoose.model('Event', eventSchema);

export default Event;