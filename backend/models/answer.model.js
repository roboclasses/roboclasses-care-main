import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    answer: { 
        type: Map, 
        of:{
            type: String,
            enum: ["A", "B", "C", "D"]
        },
        required: true },
    candidate:{
      type: String, 
      required: true
    }
  },
  { timestamps: true }
);

export const Answer =
  mongoose.models.Answer ?? mongoose.model("Answer", answerSchema);
