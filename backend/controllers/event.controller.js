import Event from '../models/event.model.js';


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


export {
    getAllEvent,
    getEventById,
  
}