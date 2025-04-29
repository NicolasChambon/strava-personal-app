import axios from "axios";
import { getAccessToken } from "./getAccessToken.ts";

const accessToken = await getAccessToken();

export const getProfileInformation = async () => {
  try {
    const response = await axios.get("https://www.strava.com/api/v3/athlete", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching profile information:", error);
    throw new Error("Failed to fetch profile information");
  }
};
