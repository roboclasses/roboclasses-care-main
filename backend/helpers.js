import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

// helper: sending whatsApp reminder
export const sendReminder = async (userName, destination, campaignName) => {
    const { AISENSY_API_KEY, AISENSY_BASE_URL } = process.env;

    console.log("base url" + AISENSY_BASE_URL);
    console.log("api key" + AISENSY_API_KEY);

    const payload = {
      apiKey: AISENSY_API_KEY,
      campaignName,
      destination,
      userName,
    };

    console.log("Payload is" + JSON.stringify(payload, null, 2));

    try {
      const res = await axios.post(
        `${AISENSY_BASE_URL}`,
        payload
        //  { headers: { Authorization: `Bearer ${AISENSY_API_KEY}` } }
      );

      const currentTime = new Date().toLocaleString();

      console.log(`reminder sent successfully on ${currentTime}` + res.data);
    } catch (error) {
      console.error("Failed to send reminder", error);
    }
  };