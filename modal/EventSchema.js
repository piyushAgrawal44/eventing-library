import mongoose from "mongoose";

const eventSchema= mongoose.Schema({
    eventName: {
        type:String,
    },
    eventType: {
        type:String
    },
    eventTimestamp: {
        type:String,
        default: new Date()
    }
});
const event= mongoose.model('event', eventSchema);

export default  event;