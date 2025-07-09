import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      required: true,
      type: Date,
      index: true,
    },
    userName: {
      required: true,
      type: String,
      index: true,
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
    },
    isZoomMeeting: {
      type: Boolean,
      default: false,
    },
     topic: {
      type: String,
      default: "",
    },
     type: {
      type: Number, //1:default
      default: 1,
    },
     duration: {
      type: Number,
      default: 60,
    },
     agenda: {
      type: String,
      default: "",
    },
     participants: {
      type: [String],
      default: [],
    },
     isMeetingSetting: {
      type: Boolean,
      default: false,
    },
     meetingReminder: {
      type: String,
      default: "",
    },
    settings:{
      host_video:{
        type: Boolean,
        default: true,
      },
      participant_video:{
        type: Boolean,
        default: true,
      },
      join_before_host:{
        type: Boolean,
        default: false,
      },
      mute_upon_entry:{
        type: Boolean,
        default: true,
      },
      watermark:{
        type: Boolean,
        default: false,
      },
      use_pmi:{
        type: Boolean,
        default: false,
      },
      approval_type:{
        type: Number,
        default: 0,
      },
      audio:{
        type: String,
        default: 'both',
      },
      auto_recording:{
        type: String,
        default: 'none',
      },
    }
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.models.Appointment ?? mongoose.model("Appointment", appointmentSchema);
