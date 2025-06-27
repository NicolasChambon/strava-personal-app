import { use } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

/**
 * Custom hook to access the authentication context (state and actions).
 * It is an improved version of useContext(AuthContext)
 * @returns {AuthContextType} - The authentication context containing state and actions.
 * @throws {Error} - Throws an error if used outside of an AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
