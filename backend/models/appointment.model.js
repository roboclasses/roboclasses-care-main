import mongoose, { model, Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    date: {
      required: true,
      type: Date,
    },
    userName: {
      required: true,
      type: String,
    },
    destination: {
      required: true,
      type: String,
    },
    course: {
      required: true,
      type: String,
    },
    teacher: {
      required: true,
      type: String,
    },
    time: {
      required: true,
      type: String,
    },
    items: {
      required: true,
      type: [String],
    },
    status: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment =
  mongoose.models.Appointment ?? model("Appointment", appointmentSchema);
