import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import { dbConnect } from "./config/db.js";

import demoClassAppointmentRoutes from "./routes/demoClassAppointmentRoute.js"
import newBatchEntryRoutes from "./routes/newBatchEntryRoute.js"
import attendanceRoutes from "./routes/attendanceRoute.js"
import normalClassAppointmentRoutes from "./routes/normalClassAppointmentRoute.js"
import userRoutes from "./routes/userRoutes.js"
import newCourseEntry from "./routes/newCourseEntryRoute.js"
import studentRoutes from "./routes/studentRoute.js"
import timeOffRoutes from "./routes/timeOffRoute.js"
import holidayRoutes from "./routes/holidayRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"

import { handleCleanupExpiredTimeOff } from "./jobs/cleanupExpiredTimeOff.js";

dotenv.config();
const app = express();

// connect to db
dbConnect();

// cleanup function that runs everyday at midnight
handleCleanupExpiredTimeOff();

// middlewares
// app.use(cors());
app.use(cors({credentials:true, origin:["https://app-roboclasses-care.up.railway.app"]}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// routes
app.use('/api/v1',userRoutes)
app.use('/api/v1',studentRoutes)
app.use('/api/v1',demoClassAppointmentRoutes)
app.use('/api/v1',normalClassAppointmentRoutes)
app.use('/api/v1', newBatchEntryRoutes)
app.use('/api/v1',newCourseEntry)
app.use('/api/v1',attendanceRoutes)
app.use('/api/v1',timeOffRoutes)
app.use('/api/v1',holidayRoutes)
app.use('/api/v1',eventRoutes)




// listning on port
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost' ;

app.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
