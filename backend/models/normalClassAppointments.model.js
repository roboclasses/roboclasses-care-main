import mongoose from "mongoose";
import { Student } from "./student.model.js";

const normalClassSchema = new mongoose.Schema(
  {
    teacher: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    studId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref:'Student',
      required:true,
    },
    destination: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    time: {
      type: [String],
      required: true,
    },
    weekDay: {
      type: [String],
      required: true,
    },
    date: {
      type: [Date],
      required: true,
    },
    timeZone: {
      type: String,
      required: true,
    },
    numberOfClasses: {
      type: String,
    },
    items: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

// Automatically update the Student's classes array after saving a NormalClass.
normalClassSchema.post("save", async function (doc, next) {
  try {
    await Student.findByIdAndUpdate(doc.studId, { $push: { classes: doc._id } });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});


export const NormalClass = mongoose.models.NormalClass ?? mongoose.model("NormalClass", normalClassSchema);
