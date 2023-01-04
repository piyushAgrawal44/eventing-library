import Event from '../modal/EventSchema.js';

import { validationResult } from "express-validator";

// end point for getting list of all the event using GET request
export const getEvents = (async (req, res) => {
    try {

        const getEvents = await Event.find({},
        { eventName: 1,eventType:1, eventTimestamp: 1 });
        res.json(getEvents);
    } catch (error) {
        res.json({ message: error.message })

    }
});

// end point for adding a new event using POST Request
export const addEvent = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        Event.create({
            eventName: req.body.name,
            eventType: req.body.type
        }).then(event => res.json(event));
    } catch (error) {
        res.json({ message: error.message })

    }
};
