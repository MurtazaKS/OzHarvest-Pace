import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/dataContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ViewVisitor = () => {
  const { getCustomerByID, updateCustomer } = useContext(DataContext);
  const params = useParams();
  const { customerid } = params;
  const [customer, setCustomer] = useState(null);

  const handleUpdateCustomer = async () => {
    const updatedCustomer = await updateCustomer(customerid, customer);
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await getCustomerByID(customerid);

      setCustomer(data);
    };

    fetchCustomer();
  }, [customerid]);

  const handleInputChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box>
      {customer && (
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            value={customer?.["firstname"]}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="middlename"
            label="Middle Name"
            name="middlename"
            autoComplete="middlename"
            value={customer?.["middlename"]}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            value={customer?.["lastname"]}
            onChange={handleInputChange}
          />
          {/* Add more fields as needed */}
          <Button onClick={handleUpdateCustomer}>Update Customer</Button>
        </>
      )}
    </Box>
  );
};

export default ViewVisitor;
