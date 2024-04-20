import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

export const DataContext = createContext();

const baseURL = "http://localhost:3001/api/customer";

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [, setUser] = useState(user);

  const newVisitor = async (visitor) => {
    try {
      const response = await axios.post(`${baseURL}/register`, visitor, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const dataValue = {
    newVisitor,
  };
  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
};
