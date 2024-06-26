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
  const userURL = "http://localhost:3001/api/users";
  const baseURL = "http://localhost:3001/api/customer";

  const getUsers = async () => {
    try {
      const response = await axios.get(`${userURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${baseURL}`, {
        headers: {
          Authorization: `Bearer ${token}`, // replace with your auth token
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const getCustomerByID = async (customerId) => {
    try {
      const response = await axios.get(`${baseURL}/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const newCustomer = async (visitor) => {
    try {
      const response = await axios.post(`${baseURL}/register`, visitor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Customer Added Successfully");
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error("Failed to Add Customer");
    }
  };

  const updateCustomer = async (id, customerData) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, customerData, {
        headers: {
          Authorization: `Bearer ${token}`, // replace with your auth token
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const addIdent = async (visitorID, document, value) => {
    try {
      const response = await axios.post(
        `${baseURL}/${visitorID}/ident`,
        {
          document,
          value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const addCustomerAddress = async (visitorID, address) => {
    try {
      const response = await axios.post(
        `${baseURL}/${visitorID}/address`,
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
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

  const searchCustomerByIdent = async (document, value) => {
    const identData = {
      ident: {
        document,
        value,
      },
    };

    try {
      const response = await axios.post(`${baseURL}`, identData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
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
    getUsers,
    newCustomer,
    getCustomers,
    searchCustomer,
    checkInCustomer,
    addIdent,
    getCustomerByID,
    addCustomerAddress,
    searchCustomerByIdent,
    updateCustomer,
  };
  return (
    <>
      <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
      <ToastContainer />
    </>
  );
};
