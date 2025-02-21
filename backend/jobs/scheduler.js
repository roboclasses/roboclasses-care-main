import cron from "node-cron";
import { parse, format } from "date-fns";
import { DateTime } from "luxon";

import { sendReminder } from "../helpers.js";


// scheduler
async function scheduleReminders(appointment) {
  const { time, date, userName, destination, items } = appointment;

  let dateTimes;

  if (Array.isArray(date) && Array.isArray(time)) {
    dateTimes = date.map((d, i) => {
      const dateTimeString = `${format(d, "yyyy-MM-dd")} ${time[i]}`
      return parse(dateTimeString, "yyyy-MM-dd HH:mm", new Date());
    });
  } else {
    const dateTimeString = `${format(date, "yyyy-MM-dd")} ${time}`
    dateTimes = [parse(dateTimeString, "yyyy-MM-dd HH:mm", new Date())];
  }

  // Iterate through the array of date and time
  dateTimes.forEach((dateTime) => {
    const indianDT = DateTime.fromJSDate(dateTime, {zone:"Asia/Kolkata"})
    console.log("Indian time (Schedule):" + indianDT.toFormat("yyyy-MM-dd HH:mm"));

    // Convert IST time to Dubai(GST) timezone
    // const dubaiDateTime = new Date(dateTime.getTime() - 1.5 * 60 * 60 * 1000);
    // const dubaiDateTime = DateTime.fromJSDate(dateTime, {zone:"Asia/Dubai"})
    const dubaiDateTime = indianDT.setZone("Asia/Dubai")
    console.log("Dubai time (Schedule):" + dubaiDateTime.toFormat("yyyy-MM-dd HH:mm"));

    const scheduleReminder = (reminderTime, campaignName) => {

      const minute = reminderTime.minute;
      const hour = reminderTime.hour;
      const day = reminderTime.day;
      const month = reminderTime.month;

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
      // const reminderFor1Hour = subHours(dubaiDateTime, 1);
      const reminderFor1Hour = dubaiDateTime.minus({hours: 1});
      console.log("1-hour reminder time (Appointment:)" + reminderFor1Hour.toFormat("yyyy-MM-dd HH:mm"));
      scheduleReminder(reminderFor1Hour, "Trial_Class_Demo_1_hour");
    }

    if (items.includes("24hour")) {
      // const reminderFor24Hours = subHours(dubaiDateTime, 24);
      const reminderFor24Hours = dubaiDateTime.minus({hours: 24});
      console.log("24-hours reminder time (Appointment:)" + reminderFor24Hours.toFormat("yyyy-MM-dd HH:mm"));
      scheduleReminder(reminderFor24Hours, "Trial_Class_Demo_24_hour");
    }
  });
}



export default scheduleReminders;