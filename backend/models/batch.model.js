import mongoose from "mongoose";

const newBatchEntrySchema = new mongoose.Schema({
   
    teacher:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    day:{
        type:[String],
        required:true
    },
    time:{
        type:[String],
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    timeZone:{
        required:true,
        type:String,
    },
    numberOfClasses:{
        type:String,
    },
    studentName:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    completed:{
        type:String,
        required:true,
        default:"No"
    }
},{timestamps:true})

export const NewBatchEntries = mongoose.models.NewBatchEntries ?? mongoose.model('NewBatchEntries',newBatchEntrySchema)