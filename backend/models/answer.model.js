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
  },
  candidate:{
    type: String,
    required: true,
  },
  batch:{
    type: String,
    required: true,
  },
  assessmentLevel:{
    type: String,
    required: true,
  },
},{timestamps: true})

export const Answer =
  mongoose.models.Answer ?? mongoose.model("Answer", answerSchema);
