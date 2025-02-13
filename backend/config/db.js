import mongoose from "mongoose";
import  dotenv from "dotenv"
dotenv.config();

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });

    // await mongoose.connect(dbURL, {dbName: process.env.DB_NAME})
    console.log("mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
