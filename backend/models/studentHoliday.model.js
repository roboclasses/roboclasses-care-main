import mongoose from "mongoose";

const studentHolidaySchema = new mongoose.Schema({
    holiday: {type:String, required: true},
    dateRange: {type:{from: Date, to: Date}, required: true, index: true}
})


export const StudentHoliday = mongoose.models.StudentHoliday ?? mongoose.model('StudentHoliday', studentHolidaySchema)