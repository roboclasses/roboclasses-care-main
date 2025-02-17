import mongoose from "mongoose";

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
    destination: {
      type: String,
      required: true,
      unique: true,
    },
    batch: {
      type: String,
      required: true,
    },
    time: {
      type: [String],
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const NormalClass = mongoose.models.NormalClass ?? mongoose.model("NormalClass", normalClassSchema);
