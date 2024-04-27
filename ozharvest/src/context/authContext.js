import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const baseURL = "http://localhost:3001/api/auth";

  const createUser = async (user) => {
    try {
      const response = await axios.post(`${baseURL}/signup`, user);
      // Save the token to localStorage or use it as needed
      toast.success("User Created Successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to Create User");
      // Handle the error as needed
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post(`${baseURL}/login`, user);
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success("User Logged In Successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to Log In");
      // Handle the error as needed
    }
  };

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/whoami`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.username !== "guest") {
        setUser(response.data.id);
        localStorage.setItem("user", JSON.stringify(response.data.id));
        return response.data.id;
      } else {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${baseURL}/logout`);
      if (response.status === 204) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [user]);

  const authValue = {
    createUser,
    loginUser,
    user,
    logoutUser,
    checkAuthStatus,
  };

  return (
    <>
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
      <ToastContainer />
    </>
  );
};
