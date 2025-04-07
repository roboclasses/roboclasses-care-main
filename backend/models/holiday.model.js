import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
    holiday:{type:String, required:true, unique:true, index:true},
    duration:{type:String, require:true}
},{timestamps: true})


export const Holiday = mongoose.models.Holiday ?? mongoose.model("Holiday", holidaySchema)