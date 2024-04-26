import Event from '../models/event.model.js';
import User from '../models/user.model.js'; 
import Review from '../models/event_review.model.js';

// Function to get all event
const getAllEvent = async (req, res) => {
    try {
        const eventList = await Event.find();
        // res.setHeader('Content-Type', 'application/json');
        //console.log(eventList)
        res.json(eventList);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to get a single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Function to register user for an event
const registerForEvent = async (req, res) => {
    console.log('hello');
    console.log('Request Params:', req.params); // Log the request params to see if userId is present

    const { id} = req.params; // Extract event ID from URL params
    // console.log(req.userID)
    // console.log(userId);
    
    try {
        // Update the user's eventList array with the eventId
        // await User.findByIdAndUpdate(userId, { $addToSet: { eventlist: id } });
        await User.findByIdAndUpdate("65cf3075a4541c1108ff69ad", { $addToSet: { eventlist: id } });
        res.status(200).json({ message: 'Registered for event successfully' });
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const unregisterFromEvent = async (req, res) => {
    console.log(req.params);
    const { id } = req.params; // Extract event ID from URL params
    const userId = "65cf3075a4541c1108ff69ad";
    console.log('hello2');
    console.log(id);
    try {
        // Update the user's eventList array to remove the eventId
        await User.findByIdAndUpdate(userId, { $pull: { eventlist: id } });
        
        res.status(200).json({ message: 'Unregistered from event successfully' });
    } catch (error) {
        console.error('Error unregistering from event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createReview = async (req, res) => {
    
    const review = new Review({
        username: req.body.username,
        userid: req.body.userid,
        event: req.params.id,
        text: req.body.text
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getReviewsByEventId = async (req, res) => {
    try {
        const reviews = await Review.find({ event: req.params.id });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export {
    getAllEvent,
    getEventById,
    registerForEvent,
    unregisterFromEvent,
    createReview,
    getReviewsByEventId
  
}
