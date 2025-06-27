import { useEffect, useState } from "react";
import { SummaryActivity } from "../type/interface";
import { stravaService } from "../services/stravaService";
import { useAuth } from "./useAuth";

interface UseActivitiesReturn {
  activities: SummaryActivity[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useActivities = (): UseActivitiesReturn => {
  const { accessToken, isAuthenticated, isTokenValid } = useAuth();
  const [activities, setActivities] = useState<SummaryActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    if (!accessToken || !isAuthenticated || !isTokenValid()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await stravaService.getActivities(accessToken);
      setActivities(data);
    } catch (err) {
      console.error("Failed to fetch activities:", err);
      setError("Failed to fetch activities. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isTokenValid() && accessToken) {
      void fetchActivities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, accessToken]);

  return {
    activities,
    isLoading,
    error,
    refetch: fetchActivities,
  };
};
