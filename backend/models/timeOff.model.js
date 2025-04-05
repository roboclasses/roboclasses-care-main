import mongoose from "mongoose";

const timeOffSchema = new mongoose.Schema({
    teacherName:{
        type:String,
        required:true,
    },
    timeOffType:{
        type:String,
        required:true,
    },
    dateRange:{
        type:{from: Date, to: Date},
        required:true,
        index: true,
    },
    notes:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:"Requested"
    },
},{timestamps: true})


export const Leaves = mongoose.models.Leaves  ?? mongoose.model("Leaves", timeOffSchema)