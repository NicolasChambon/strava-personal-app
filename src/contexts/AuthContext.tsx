import { createContext } from "react";
import { AuthState } from "../providers/AuthProvider";

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

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
