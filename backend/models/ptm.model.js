import mongoose from "mongoose";

const ptmSchema = new mongoose.Schema({
    batch:{type: String, required: true},
    studentName:{type: String, required: true},
    email:{type: String, required: true, index: true},
    destination:{type: String, required: true},
    teacher:{type: String, required: true},
    timeZone:{type: String, required: true},
    date:{type: Date, required: true},
    time:{type: String, required: true},
    topic:{type: String, required: true},
    type:{type: Number, required: true},
    duration:{type: Number, required: true},
    agenda:{type: String, required: true},
    participants:{type: [String], required: true},
    isMeetingSetting:{type: Boolean, required: true},
    meetingReminder:{type: Number, required: true},
},{timestamps: true})

export const PTM = mongoose.models.PTM ?? mongoose.model("PTM", ptmSchema);