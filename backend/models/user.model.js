import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, trim: true, unique: true, index:true, required: true },
    password: { type: String, trim:true, required: true },
    role: {
      type: String,
      enum: ["student", "teacher", "admin", "contractor"],
      trim: true,
      required: true,
    },
    workingHours: { type: String, default: "" },
    workingDays: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
