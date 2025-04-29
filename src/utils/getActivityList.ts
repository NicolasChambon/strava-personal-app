import axios from "axios";
import { getAccessToken } from "./getAccessToken.ts";
import { Activity } from "../types/activity.ts";

export const getActivityList = async (
  dateRange: { before: string; after: string },
  page: number,
  perPage: number
): Promise<Activity[]> => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          before: new Date(dateRange.before).getTime() / 1000,
          after: new Date(dateRange.after).getTime() / 1000,
          page,
          per_page: perPage,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching activity list:", error);
    throw new Error("Failed to fetch activity list");
  }
};
