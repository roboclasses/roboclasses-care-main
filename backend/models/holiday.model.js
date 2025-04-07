import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
    holiday:{type:String, required:true, unique:true, index:true},
    dateRange:{
        type:{from: Date, to: Date},
        required:true,
        index: true,
    },
},{timestamps: true})


export const Holiday = mongoose.models.Holiday ?? mongoose.model("Holiday", holidaySchema)