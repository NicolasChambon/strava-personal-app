import { Link } from "react-router-dom";
import { stravaService } from "../services/stravaService";

const Connexion = () => {
  const webAppURL = import.meta.env.VITE_WEB_APP_URL as string;
  const authUrl = stravaService.generateAuthUrl(`${webAppURL}/home`);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Personnal Strava App
          </h1>
          <p className="text-gray-600 mb-8">
            Connect your Strava account to view your activities
          </p>
          <Link
            to={authUrl}
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
          >
            Connect with Strava
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
