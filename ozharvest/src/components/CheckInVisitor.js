import React, { useContext, useState } from "react";
import { DataContext } from "../context/dataContext";
import {
  Box,
  TextField,
  List,
  ListItem,
  Button,
  MenuItem,
  Select,
} from "@mui/material";

const CheckInVisitor = () => {
  const { searchCustomer, checkInCustomer } = useContext(DataContext);
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customer = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
    };
    try {
      const response = await searchCustomer(customer);
      setSearchResults(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckIn = async (customerId) => {
    await checkInCustomer(customerId, location);
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstname"
        label="First Name"
        name="firstname"
        autoComplete="firstname"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastname"
        label="Last Name"
        name="lastname"
        autoComplete="lastname"
        autoFocus
      />
      <Button variant="contained" type="submit">
        Search
      </Button>

      <List>
        {searchResults.map((result, index) => (
          <>
            <ListItem key={index}>
              {result.firstname} {result.lastname}
            </ListItem>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}>
              <MenuItem value="Waterloo">Waterloo</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => handleCheckIn(result.id)}>
              Check In
            </Button>
          </>
        ))}
      </List>
    </Box>
  );
};

export default CheckInVisitor;
