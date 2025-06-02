import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    batch:{type:String, required:true},
    student:{type:String, required:true},
    teacher:{type:String, required:true},
    email:{type:String, required:true, unique:true, index: true},
    destination:{type:String, required:true},
    feedbacks: [
      {
        question: {
          type: String,
          required: true,
          default:'',
        },
        option: {
          a: { type: String, required: true, default:''},
          b: { type: String, required: true, default:''},
          c: { type: String, required: true, default:''},
        },
        answer: {
          type: String,
          enum: ['A', 'B', 'C'],
          required: true,
          default:''
        },
      },
    ],
    recommendProgram: {
      type: String,
      default:'',
    },
    additionalFeedback: {
      type: String,
       default:'',
    },
})

export const Feedback = mongoose.models.Feedback ?? mongoose.model('Feedback', feedbackSchema)