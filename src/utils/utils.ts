import axios from "axios";
import "dotenv/config";

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      "https://www.strava.com/oauth/token",
      null,
      {
        params: {
          client_id: process.env.STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
          refresh_token: process.env.STRAVA_REFRESH_TOKEN,
          grant_type: "refresh_token",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);

    throw new Error("Failed to refresh access token");
  }
};
