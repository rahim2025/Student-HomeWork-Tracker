import { createContext, useContext, useEffect, useState } from "react";
import { login as loginRequest } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("admin");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const handleExpired = () => {
      setToken(null);
      setAdmin(null);
    };
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("admin", JSON.stringify(data.admin));
    setToken(data.token);
    setAdmin(data.admin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setAdmin(null);
  };

  const value = {
    admin,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
