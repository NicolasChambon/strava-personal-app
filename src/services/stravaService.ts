import axios from "axios";
import { GetAccessTokenResponse, SummaryActivity } from "../type/interface";

const API_BASE_URL = import.meta.env.VITE_STRAVA_API_URL as string;
const CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID as string;
const CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET as string;

export const stravaService = {
  async getAccessToken(code: string) {
    const response = await axios.post<GetAccessTokenResponse>(
      `${API_BASE_URL}/oauth/token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }
    );
    return response.data;
  },

  async getActivities(accessToken: string) {
    const response = await axios.get<SummaryActivity[]>(
      `${API_BASE_URL}/athlete/activities`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  },

  generateAuthUrl(redirectUri: string): string {
    const scopes =
      "read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write";
    return `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=${scopes}`;
  },
};
