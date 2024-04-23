import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [, setUser] = useState(user);

  const newVisitor = async (visitor) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/customer/register",
        visitor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const searchCustomer = async (customer) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/customer",
        customer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const checkInCustomer = async (customerId, location) => {
    try {
      const response = await axios.post(
        `/api/customer/${customerId}/checkin`,
        { location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const dataValue = {
    newVisitor,
    searchCustomer,
    checkInCustomer,
  };
  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
};
