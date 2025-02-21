import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

// helper: sending whatsApp reminder
export const sendReminder = async (userName, destination, campaignName) => {
    const { AISENSY_API_KEY, AISENSY_BASE_URL } = process.env;

    const payload = {
      apiKey: AISENSY_API_KEY,
      campaignName,
      destination: destination.startsWith("+") ? destination : `+${destination}`,
      userName,
    };

    try {
      const res = await axios.post(`${AISENSY_BASE_URL}`, payload);

      const currentTime = new Date().toLocaleString();
      console.log(`reminder sent successfully on ${currentTime}` + JSON.stringify(res.data, null ,2));
    } catch (error) {
      console.error("Failed to send reminder", error);
    }
  };