import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
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
    timeZone:{
      required:true,
      type:String,
    },
    items: {
      required: true,
      type: [String],
    },
    converted: {
      type: String,
      default: "No",
    },
    batchNumber:{
      type:String,
      default:"",
      trim: true,
    },
    isCompensationClass: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.models.Appointment ?? mongoose.model("Appointment", appointmentSchema);
