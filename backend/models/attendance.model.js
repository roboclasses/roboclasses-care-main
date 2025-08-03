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
    curriculumTaught:{
        type:[String],
        required:true,
        default:[""],
    },
    completed:{
        type:String,
        required:true,
        default:"No"
    },
        dateRange:{
        type:{from: Date, to: Date},
        default: {},
        index: true,
    },

})

export const Attendance = mongoose.models.Attendance ?? mongoose.model('Attendance',attendanceSchema)