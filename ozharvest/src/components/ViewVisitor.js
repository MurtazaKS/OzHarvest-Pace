import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/dataContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const ViewVisitor = () => {
  const { getCustomerByID } = useContext(DataContext);
  const params = useParams();
  const { customerid } = params;
  const [customer, setCustomer] = useState(null);

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
            name="firstname"
            label="firstname"
            value={customer?.["firstname"]}
            onChange={handleInputChange}
          />
          <TextField
            name="lastname"
            label="lastname"
            value={customer?.["lastname"]}
            onChange={handleInputChange}
          />
          {/* Add more fields as needed */}
          <Button>Save</Button>
        </>
      )}
    </Box>
  );
};

export default ViewVisitor;
