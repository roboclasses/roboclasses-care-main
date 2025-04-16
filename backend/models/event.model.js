import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    id:{type: String, required: true, unique: true},
    title:{type: String, required: true},
    start:{type: String, required: true},
    end:{type: String, required: true},
    allDay:{type: String, required: true},
    extendedProps:{type: {createdBy: String}, required: true},
})


export const Event = mongoose.models.Event ?? mongoose.model('Event', eventSchema)