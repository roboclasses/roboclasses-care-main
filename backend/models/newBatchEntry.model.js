import mongoose from "mongoose";

const newBatchEntrySchema = new mongoose.Schema({
   
    teacher:{
        type:String,
        required:true
    },
    time:{
        type:[String],
        required:true
    },
    batch:{
        type:String,
        required:true
    },
},{timestamps:true})

export const NewBatchEntries = mongoose.models.NewBatchEntries ?? mongoose.model('NewBatchEntries',newBatchEntrySchema)