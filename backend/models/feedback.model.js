import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    batch:{type:String, required:true},
    student:{type:String, required:true},
    teacher:{type:String, required:true},
    email:{type:String, required:true, index: true, trim: true},
    destination:{type:String},
    feedbackAnswer:{ type: [String], enum: ["A", "B", "C"], required: true },
    recommendProgram: {
      type: String,
      default:'',
    },
    additionalFeedback: {
      type: String,
       default:'',
    },
    isCompleted:{
      type: Boolean,
      default: false
    },
},{timestamps: true})

export const Feedback = mongoose.models.Feedback ?? mongoose.model('Feedback', feedbackSchema)