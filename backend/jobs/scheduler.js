import cron from "node-cron";
import moment from "moment-timezone";

import { sendReminder } from "../helpers.js";

// scheduler
async function scheduleReminders(appointment) {
  const { time, date, userName, destination, items } = appointment;

  let utcDateTimes;

  if (Array.isArray(date) && Array.isArray(time)) {
    utcDateTimes = date.map((d, i) => {
      return moment.utc(`${d} ${time[i]}`, "YYYY-MM-DD HH:mm");
    });
  } else {
    utcDateTimes = [moment.utc(`${date} ${time}`, "YYYY-MM-DD HH:mm")];
  }

  // Iterate through the array of date and time
  utcDateTimes.forEach((utcDateTime) => {
    console.log("UTC time (Schedule):" + utcDateTime.format());

    // Convert UTC time to Dubai timezone
    const dubaiDateTime = utcDateTime.clone().tz("Asia/Dubai");
    console.log("Dubai time (Schedule):" + dubaiDateTime.format());

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
    if (items.includes("1hour")) {
      const reminderFor1Hour = dubaiDateTime.clone().subtract(1, "hour");
      console.log("1-hour reminder time (Appointment:)" + reminderFor1Hour.format());
      scheduleReminder(reminderFor1Hour, "Trial_Class_Demo_1_hour");
    }
  });
}

export default scheduleReminders;