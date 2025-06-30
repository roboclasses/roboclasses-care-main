import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    course: { type: String, required: true, index:true },
    numberOfClasses:{type:String, trim:true, default:""}
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema);
