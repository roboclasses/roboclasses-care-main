import cron from "node-cron";
import { Leaves } from "../models/timeOff.model.js";

// Runs every day at midnight
export async function handleCleanupExpiredTimeOff() {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - 3);

        // 3 days ago data
        await Leaves.deleteMany({
          "dateRange.to": { $lt: cutOffDate },
        });

        console.log("Expired time off records cleaned up.");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    },
    { scheduled: true }
  );
}
