import mongoose from "mongoose";
import  dotenv from "dotenv"
dotenv.config();

export const dbConnect = async () => {
  // const dbURL = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}:${process.env.MONGOPORT}/`
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME });

    // await mongoose.connect(dbURL, {dbName: process.env.DB_NAME})
    console.log("mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
