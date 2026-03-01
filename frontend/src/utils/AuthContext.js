import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/api";
import { getToken, isTokenValid } from "../services/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    if (isTokenValid()) {
      authService
        .getCurrentUser()
        .then((res) => {
          setUser(res.data.user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const res = await authService.register(data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
