import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    batchName:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    classes:{
        type:[Date],
        required:true,
    },
    teacher:{
        type:String,
        required:true,
    },
    leave:{
        type:[Date],
        default:[],
        required:true,
    },

})

export const Attendance = mongoose.models.Attendance ?? mongoose.model('Attendance',attendanceSchema)