import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { dbConnect } from "./config/db.js";
import demoClassAppointmentRoute from "./routes/demoClassAppointmentRoute.js"
import newBatchEntryRoute from "./routes/newBatchEntryRoute.js"
import attendanceRoute from "./routes/attendanceRoute.js"
import normalClassAppointmentRoute from "./routes/normalClassAppointmentRoute.js"
import userRoutes from "./routes/userRoutes.js"
import newCourseEntry from "./routes/newCourseEntryRoute.js"
import studentRoutes from "./routes/studentRoute.js"

dotenv.config();
const app = express();

// connect to db
dbConnect();

// middlewares
app.use(cors());
// app.use(cors({credentials:true, origin:["https://app-roboclasses-care.up.railway.app"]}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// routes
app.use('/api/v1',userRoutes)
app.use('/api/v1',studentRoutes)
app.use('/api/v1',demoClassAppointmentRoute)
app.use('/api/v1',normalClassAppointmentRoute)
app.use('/api/v1', newBatchEntryRoute)
app.use('/api/v1',newCourseEntry)
app.use('/api/v1',attendanceRoute)

// listning on port
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost' ;

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
