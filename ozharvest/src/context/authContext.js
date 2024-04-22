import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        user
      );
      const token = response.data.token;
      // Save the token to localStorage or use it as needed
      console.log(token);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        user
      );
      const token = response.data.token;
      // Save the token to localStorage or use it as needed
      console.log(response);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/api/auth/whoami",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.username !== "guest") {
        setUser(response.data.id);
        return response.data;
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/auth/logout");
      if (response.status === 204) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const authValue = {
    createUser,
    loginUser,
    user,
    logoutUser,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
