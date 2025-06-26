import { ReactNode, useEffect, useReducer } from "react";
import { AuthContext } from "./useAuth";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  athleteId: string | null;
  isLoading: boolean;
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | {
      type: "SET_TOKENS";
      payload: {
        accessToken: string;
        refreshToken: string;
        expiresAt: number;
        athleteId: string;
      };
    }
  | { type: "CLEAR_AUTH" }
  | { type: "RESTORE_AUTH"; payload: AuthState };

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  athleteId: null,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_TOKENS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case "CLEAR_AUTH":
      return {
        ...initialState,
        isLoading: false,
      };
    case "RESTORE_AUTH":
      return action.payload;
    default:
      return state;
  }
};

export interface AuthContextType extends AuthState {
  setTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    athleteId: string;
  }) => void;
  clearAuth: () => void;
  isTokenValid: () => boolean;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const restoreAuthState = () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const expiresAt = localStorage.getItem("expires_at");
        const athleteId = localStorage.getItem("athleteId");

        if (accessToken && refreshToken && expiresAt && athleteId) {
          const currentTime = Math.round(Date.now() / 1000);
          const expirationTime = parseInt(expiresAt);

          if (currentTime < expirationTime) {
            dispatch({
              type: "RESTORE_AUTH",
              payload: {
                isAuthenticated: true,
                accessToken,
                refreshToken,
                expiresAt: expirationTime,
                athleteId,
                isLoading: false,
              },
            });
            return;
          }
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error);
      }

      dispatch({ type: "SET_LOADING", payload: false });
    };

    restoreAuthState();
  }, []);

  const setTokens = (tokens: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    athleteId: string;
  }) => {
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);
    localStorage.setItem("expires_at", tokens.expiresAt.toString());
    localStorage.setItem("athlete", JSON.stringify(tokens.athleteId));

    dispatch({
      type: "SET_TOKENS",
      payload: tokens,
    });
  };

  const clearAuth = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("athlete");
    localStorage.removeItem("token_type");
    localStorage.removeItem("expires_in");

    dispatch({ type: "CLEAR_AUTH" });
  };

  const isTokenValid = (): boolean => {
    if (!state.expiresAt) return false;
    const currentTime = Math.round(Date.now() / 1000);
    return currentTime < state.expiresAt;
  };

  // eslint-disable-next-line react-x/no-unstable-context-value
  const value: AuthContextType = {
    ...state,
    setTokens,
    clearAuth,
    isTokenValid,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
