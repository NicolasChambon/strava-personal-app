import ActivityCard from "../components/ActivityCard";
import { useStravaAuth } from "../hooks/useStravaAuth";
import { useAuth } from "../hooks/useAuth";
import { useActivities } from "../hooks/useActivities";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const { isAuthenticated, authError } = useStravaAuth();
  const { isLoading: authLoading } = useAuth();
  const { activities, isLoading, error, refetch } = useActivities();

  const handleRetry = () => {
    void refetch();
  };

  if (authLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  if (authError) {
    return <ErrorMessage message={authError} />;
  }

  if (!isAuthenticated) {
    return <LoadingSpinner message="Authenticating..." />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mt-10 mb-5">
        Your Strava Activities
      </h1>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-600">
        Last 30 activities
      </h2>

      {isLoading && <LoadingSpinner message="Loading activities..." />}

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!isLoading && !error && activities.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Found {activities.length} activities. Click on an activity to view
            details.
          </p>
        </div>
      )}

      {!isLoading && !error && activities.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </ul>
        </div>
      )}

      {!isLoading && !error && activities.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No activities found. Start recoding your workouts on Strava!
        </p>
      )}
    </div>
  );
};

export default Home;
