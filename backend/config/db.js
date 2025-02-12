import mongoose from "mongoose";
import  dotenv from "dotenv"
dotenv.config();

export const dbConnect = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME });

    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
