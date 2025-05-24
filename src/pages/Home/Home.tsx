import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Activity, GetAccessTokenResponse } from "../../type/interface";

const Home = () => {
  const [searchParams] = useSearchParams();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  const code = searchParams.get("code");

  const client_id = import.meta.env.VITE_STRAVA_CLIENT_ID as string;
  const client_secret = import.meta.env.VITE_STRAVA_CLIENT_SECRET as string;
  const stravaApiUrl = import.meta.env.VITE_STRAVA_API_URL as string;

  const currentTime = Math.round(Date.now() / 1000);
  const expiresAt = localStorage.getItem("expires_at");

  if (expiresAt && currentTime < parseInt(expiresAt) && !isAuthenticated) {
    setIsAuthenticated(true);
  }

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!code) {
        console.error("Authorization code is missing.");
        return;
      }

      try {
        const response = await axios.post<GetAccessTokenResponse>(
          `${stravaApiUrl}/oauth/token`,
          {
            client_id,
            client_secret,
            code,
            grant_type: "authorization_code",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const {
          token_type,
          expires_at,
          expires_in,
          refresh_token,
          access_token,
          athlete,
        } = response.data;

        localStorage.setItem("token_type", token_type);
        localStorage.setItem("expires_at", expires_at.toString());
        localStorage.setItem("expires_in", expires_in.toString());
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("athlete", JSON.stringify(athlete));
      } catch (err) {
        console.error("Failed to fetch access token:", err);
      }
    };

    if (isAuthenticated) {
      return;
    }

    console.warn("Token expired or not found, fetching new token...");
    void fetchAccessToken();
  }, [code, client_id, client_secret, stravaApiUrl, isAuthenticated]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("Access token is not available.");
      return;
    }

    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${stravaApiUrl}/athlete/activities`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setActivities(response.data as Activity[]);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    };

    if (isAuthenticated) {
      void fetchActivities();
    }
  }, [isAuthenticated, stravaApiUrl]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline text-center mt-10 mb-5">
        Home Page
      </h1>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Last 30 activities
      </h2>
      {activities.length > 0 && (
        <ul className="space-y-2 max-w-2xl mx-auto">
          {activities.map((activity) => (
            <li
              className="p-4 border rounded shadow hover:bg-gray-100 transition-colors duration-200"
              key={activity.id}
            >
              <p className="text-lg font-medium text-blue-600 hover:underline">
                {activity.name}
              </p>
              <p className="text-gray-600">
                {new Date(activity.start_date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
