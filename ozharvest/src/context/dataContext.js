import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [, setUser] = useState(user);
  const baseURL = "http://localhost:3001/api/customer";

  const newVisitor = async (visitor) => {
    try {
      const response = await axios.post(`${baseURL}/register`, visitor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Customer Added Successfully");
      }
      return response.data;
    } catch (error) {
      toast.error("Failed to Add Customer");
    }
  };

  const searchCustomer = async (customer) => {
    try {
      const response = await axios.post(`${baseURL}`, customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Customer Listed");
      }
      return response.data;
    } catch (error) {
      toast.error("Failed to List Customer");
    }
  };

  const checkInCustomer = async (customerId, location) => {
    try {
      const response = await axios.post(
        `${baseURL}/${customerId}/checkin`,
        { location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Customer Checked In Successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to Check In Customer");
    }
  };

  const dataValue = {
    newVisitor,
    searchCustomer,
    checkInCustomer,
  };
  return (
    <>
      <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
      <ToastContainer />
    </>
  );
};
