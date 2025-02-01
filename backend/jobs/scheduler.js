import cron from "node-cron";
import moment from "moment-timezone"; 

import { sendReminder } from "../helpers.js";
 
 // scheduler
 async function scheduleReminders(appointment) {
    const { time, date, userName, destination, items } = appointment;

    // Combine date and time in Indian timezone
    const indianDateTime = moment.tz(
      `${date} ${time}`,
      "YYYY-MM-DD HH:mm",
      "Asia/Kolkata"
    );
    console.log("Indian time (Schedule):" + indianDateTime.format());

    // Convert Indian timezone to Dubai timezone
    const dubaiDateTime = indianDateTime.clone().tz("Asia/Dubai");
    console.log("dubai time (Schedule):" + dubaiDateTime.format());

    const scheduleReminder = (reminderTime, campaignName) => {
      const minute = reminderTime.minute();
      const hour = reminderTime.hour();
      const day = reminderTime.date();
      const month = reminderTime.month() + 1;

      const cronExpression = `${minute} ${hour} ${day} ${month} *`;

      console.log("Scheduled Cron Expression:", cronExpression);

      cron.schedule(
        cronExpression,
        async () => {
          console.log("Running Cron Job:", cronExpression);
          await sendReminder(userName, destination, campaignName);
        },
        { scheduled: true, timezone: "Asia/Dubai" }
      );
    };

    // Conditions for sending reminder on timely basis
    if (items.includes("24hour")) {
      const reminderFor24Hours = dubaiDateTime.clone().subtract(24, "hours");
      console.log("24-hour reminder time (Appointment:)" + reminderFor24Hours.format());
      scheduleReminders(reminderFor24Hours, "Trial_Class_Demo_24_hour");
    }

    if (items.includes("1hour")) {
      const reminderFor1Hour = dubaiDateTime.clone().subtract(1, "hour");
      console.log("1-hour reminder time (Appointment:)" + reminderFor1Hour.format());
      scheduleReminder(reminderFor1Hour, "Trial_Class_Demo_1_hour");
    }
  }


  export default scheduleReminders;