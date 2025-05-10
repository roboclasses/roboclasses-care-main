import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  assessmentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Assessment",
    required: true,
    
  },
  answer:{
    type: [String],
    enum: ["A", "B", "C", "D"],
    required: true,
  }
})

export const Answer =
  mongoose.models.Answer ?? mongoose.model("Answer", answerSchema);
