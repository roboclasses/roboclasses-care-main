import cron from "node-cron";
import { toZonedTime, formatInTimeZone } from "date-fns-tz";
import { parse, subHours, format } from "date-fns";

import { sendReminder } from "../helpers.js";

// scheduler
async function scheduleReminders(appointment) {
  const { time, date, userName, destination, items } = appointment;

  let indianDateTimes;

  if (Array.isArray(date) && Array.isArray(time)) {
    indianDateTimes = date.map((d, i) => {
      const dateTimeString = `${format(d, "yyyy-MM-dd")} ${time[i]}`
      return parse(dateTimeString, "yyyy-MM-dd HH:mm", new Date());
    });
  } else {
    const dateTimeString = `${date} ${time}`
    indianDateTimes = [parse(dateTimeString, "yyyy-MM-dd HH:mm", new Date())];
  }

  // Iterate through the array of date and time
  indianDateTimes.forEach((indianDateTime) => {
    console.log("Indian time (Schedule):" + formatInTimeZone(indianDateTime, "Asia/Kolkata", "yyyy-MM-dd HH:mm"));

    // Convert UTC time to Dubai timezone
    const dubaiDateTime = toZonedTime(indianDateTime.toISOString(), "Asia/Dubai");
    console.log("Dubai time (Schedule):" + formatInTimeZone(dubaiDateTime, "Asia/Dubai", "yyyy-MM-dd HH:mm"));

    const scheduleReminder = (reminderTime, campaignName) => {
      const minute = reminderTime.getMinutes();
      const hour = reminderTime.getHours();
      const day = reminderTime.getDate();
      const month = reminderTime.getMonth() + 1;

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
      const reminderFor1Hour = subHours(dubaiDateTime, 1);
      console.log("1-hour reminder time (Appointment:)" + formatInTimeZone(reminderFor1Hour, "Asia/Dubai", "yyyy-MM-dd HH:mm"));
      scheduleReminder(reminderFor1Hour, "Trial_Class_Demo_1_hour");
    }

    if (items.includes("24hour")) {
      const reminderFor24Hours = subHours(dubaiDateTime, 24);
      console.log("24-hours reminder time (Appointment:)" + formatInTimeZone(reminderFor24Hours, "Asia/Dubai", "yyyy-MM-dd HH:mm"));
      scheduleReminder(reminderFor24Hours, "Trial_Class_Demo_24_hour");
    }
  });
}



export default scheduleReminders;