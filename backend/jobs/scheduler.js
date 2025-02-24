import cron from "node-cron";
import { DateTime } from "luxon";
import { sendReminder } from "../helpers.js";

// Scheduler function
async function scheduleReminders(appointment) {
  const { time, date, userName, destination, items, timeZone } = appointment;

  // Ensure date and time are arrays
  const dateArray = Array.isArray(date) ? date : [date];
  const timeArray = Array.isArray(time) ? time : [time];

  // Iterate through the array of date and time
  dateArray.forEach((d, index) => {
    const t = timeArray[index]; // Get corresponding time for the date

    // Combine date and time into a single datetime string
    const dateTimeString = `${d} ${t}`;

    // Parse the datetime string into a Luxon DateTime object in the user's timezone
    const userDateTime = DateTime.fromFormat(dateTimeString, "yyyy-MM-dd HH:mm", {
      zone: timeZone,
    });

    // Convert the user's local datetime to UTC
    const utcDateTime = userDateTime.toUTC();

    console.log(
      `User's local time (Schedule): ${userDateTime.toFormat("yyyy-MM-dd HH:mm")}`
    );
    console.log(
      `UTC time (Schedule): ${utcDateTime.toFormat("yyyy-MM-dd HH:mm")}`
    );

    // Schedule reminders
    const scheduleReminder = (reminderTime, campaignName) => {
      const minute = reminderTime.minute;
      const hour = reminderTime.hour;
      const day = reminderTime.day; // Day of the month
      const month = reminderTime.month; // Month of the year

      // Cron expression format: minute hour day month dayOfWeek
      const cronExpression = `${minute} ${hour} ${day} ${month} *`;

      console.log("Scheduled Cron Expression:", cronExpression);

      cron.schedule(
        cronExpression,
        async () => {
          console.log("Running Cron Job:", cronExpression);
          await sendReminder(userName, destination, campaignName);
        },
        { scheduled: true, timezone: timeZone } // Use the user's timezone
      );
    };

    // Conditions for sending reminder on timely basis
    if (items.includes("1hour")) {
      const reminderFor1Hour = userDateTime.minus({ hours: 1 });
      console.log(
        "1-hour reminder time (Appointment):",
        reminderFor1Hour.toFormat("yyyy-MM-dd HH:mm")
      );
      scheduleReminder(reminderFor1Hour, "Trial_Class_Demo_1_hour");
    }

    if (items.includes("24hour")) {
      const reminderFor24Hours = userDateTime.minus({ hours: 24 });
      console.log(
        "24-hours reminder time (Appointment):",
        reminderFor24Hours.toFormat("yyyy-MM-dd HH:mm")
      );
      scheduleReminder(reminderFor24Hours, "Trial_Class_Demo_24_hour");
    }
  });
}

export default scheduleReminders;