const Event = require('../models/Event');

const eventController = {
    // Create an event
    createEvent: async (req, res) => {
        try {
            const { title, description, date } = req.body;

            const newEvent = new Event({ title, description, date });
            await newEvent.save();

            res.status(201).send('Event created successfully');
        } catch (error) {
            res.status(500).send('Error in creating event');
        }
    },

    // View all events
    viewEvents: async (req, res) => {
        try {
            const events = await Event.find({});
            res.status(200).json(events);
        } catch (error) {
            res.status(500).send('Error in fetching events');
        }
    },

    // Delete an event
    deleteEvent: async (req, res) => {
        try {
            const { id } = req.params;
            await Event.findByIdAndDelete(id);
            res.status(200).send('Event deleted successfully');
        } catch (error) {
            res.status(500).send('Error in deleting event');
        }
    }
};

module.exports = eventController;
