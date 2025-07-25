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
        trim: true,
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
        index:true,
        trim: true,
    },
    completed:{
        type:String,
        required:true,
        default:"No"
    },
    colorCode:{
        type:String,
        required:true,
        default:"#0055A4"
    },
   isColorCoding:{
        type:Boolean,
        default: false,
    }

},{timestamps:true})

export const NewBatchEntries = mongoose.models.NewBatchEntries ?? mongoose.model('NewBatchEntries',newBatchEntrySchema)