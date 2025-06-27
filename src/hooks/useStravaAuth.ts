import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect, useRef, useState } from "react";
import { stravaService } from "../services/stravaService";

/**
 * Custom hook to handle Strava authentication.
 * It checks for the authorization code in the URL, exchanges it for tokens,
 * and updates the authentication state.
 *
 * @returns {Object} - Contains isAuthenticated status and any authentication error.
 */
export const useStravaAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setTokens, isTokenValid, isAuthenticated } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (isAuthenticated && isTokenValid()) {
      return;
    }

    if (!code) {
      return;
    }

    if (isProcessingRef.current) {
      return;
    }

    const exchangeCodeForToken = async () => {
      try {
        isProcessingRef.current = true;
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
      } finally {
        isProcessingRef.current = false;
      }
    };

    void exchangeCodeForToken();
  }, [searchParams, navigate, setTokens, isAuthenticated, isTokenValid]);

  return {
    isAuthenticated: isAuthenticated && isTokenValid(),
    authError,
  };
};
