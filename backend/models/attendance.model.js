import mongoose from "mongoose";

const rowsSchema = new mongoose.Schema({
    id:{type:String,required:true},
    cells:{type:Map, of:String, default:{}}
}) ;

const columnSchema = new mongoose.Schema({
    id:{type:String, required:true},
    name:{type:String, required:true},
    type:{type:String, required:true},
});

const attendanceSchema = new mongoose.Schema({
    rows:{
        type:[rowsSchema],
        required:true,
        default:[]
    },
    columns:{
        type:[columnSchema],
        required:true,
    }
 
},{timestamps:true})

export const Attendance = mongoose.models.Attendance ?? mongoose.model('Attendance',attendanceSchema)