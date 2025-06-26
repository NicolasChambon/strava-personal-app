import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useEffect, useState } from "react";
import { stravaService } from "../services/stravaService";

export const useStravaAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setTokens, isTokenValid, isAuthenticated } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");

    if (isAuthenticated && isTokenValid()) {
      return;
    }

    if (!code) {
      return;
    }

    const exchangeCodeForToken = async () => {
      try {
        setAuthError(null);
        const tokenData = await stravaService.getAccessToken(code);

        setTokens({
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt: tokenData.expires_at,
          athleteId: tokenData.athlete.id.toString(),
        });

        navigate("/home", { replace: true });
      } catch (error) {
        console.error("Authentication failed:", error);
        setAuthError("Authentication failed. Please try again.");
        navigate("/", { replace: true });
      }
    };

    void exchangeCodeForToken();
  }, [searchParams, navigate, setTokens, isAuthenticated, isTokenValid]);

  return {
    isAuthenticated: isAuthenticated && isTokenValid(),
    authError,
  };
};
