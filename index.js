import { route } from "./route/route.js"
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from 'body-parser';
import {logger} from './logger/index.js';
const app = express();
const backendAPI="http://localhost:8000";
import Event from './modal/EventSchema.js';


const addEvent = async (eventName,eventType) => {

    try {
       await Event.create({
            eventName: eventName,
            eventType: eventType
        });
    } catch (error) {
        console.log({ message: error.message })

    }
};
class Events {
    // Register an event handler
    on(eventName, callback) {
        this[eventName] = callback;
        logger.info("eventName --> "+eventName+" method --> on eventTimestamp ");
        addEvent(eventName,"on");
    }

    // Trigger all callbacks associated with a given eventName
    trigger(eventName) {
        if (this[eventName]) {
            this[eventName]();
            logger.info("eventName --> "+eventName+" method --> trigger eventTimestamp -->");
            addEvent(eventName,"trigger");
        }
    }

    // Remove all event handlers associated with the given eventName
    off(eventName) {
        if (this[eventName]) {
            delete this[eventName];
        }
        logger.info("eventName --> "+eventName+" method --> off eventTimestamp -->");
            addEvent(eventName,"off");
    }
}


const PORT = 8000 || process.env.PORT;

const url = "mongodb+srv://piyush:3EkGGELBAW0riN53@cluster0.ugknm.mongodb.net/custom_dashboard_db?retryWrites=true&w=majority";

app.use((express.json()));

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

    app.use(bodyParser.json({ extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.use('/', route);

    app.listen(PORT, () => {
        console.log(`server is running at http://localhost:${PORT}`);
        
        let obj = new Events;
        
        // Triggering the events
        obj.on('say-bye', function(){
            console.log("Bye Bye Programming")
        });
        obj.trigger('say-bye');
        obj.off('say-bye');
        
    })
}).catch((error) => { console.log("error is: " + error.message) });

