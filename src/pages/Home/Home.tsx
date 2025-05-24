import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetAccessTokenResponse } from "../../type/interface";

const Home = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const client_id = import.meta.env.VITE_STRAVA_CLIENT_ID as string;
  const client_secret = import.meta.env.VITE_STRAVA_CLIENT_SECRET as string;
  const stravaApiUrl = import.meta.env.VITE_STRAVA_API_URL as string;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!code) {
        console.error("Authorization code is missing.");
        return;
      }

      setIsLoading(true);
      setError(null);

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

        const { access_token, refresh_token } = response.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
      } catch (err) {
        console.error("Failed to fetch access token:", err);
        setError("Strava authorization failed.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAccessToken();
  }, [code, client_id, client_secret, stravaApiUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <h1>Home Page</h1>
      <Link to="/last-activities">Last Activities</Link>
    </div>
  );
};

export default Home;
