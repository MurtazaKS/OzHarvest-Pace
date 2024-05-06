import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/dataContext";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CheckInVisitor = () => {
  const { searchCustomer, checkInCustomer, getCustomers } =
    useContext(DataContext);
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

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await getCustomers();

      setSearchResults(customers);
    };

    fetchCustomers();
  }, [getCustomers]);
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

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Check In</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((result, index) => (
              <TableRow key={index}>
                <TableCell>
                  {result.firstname} {result.lastname}
                </TableCell>
                <TableCell>
                  {new Date(result.birthday).toLocaleDateString("en-GB")}
                </TableCell>
                {result.checkin && result.checkin.length > 0 ? (
                  <>
                    <TableCell>
                      {new Date(
                        result.checkin[result.checkin.length - 1].date
                      ).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                      {result.checkin[result.checkin.length - 1].time}
                    </TableCell>
                    <TableCell>
                      {result.checkin[result.checkin.length - 1].location}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </>
                )}
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}>
                    <Select
                      sx={{ minWidth: "90px", maxHeight: "40px" }}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}>
                      <MenuItem value="Waterloo">Waterloo</MenuItem>
                    </Select>
                    <Button
                      variant="contained"
                      onClick={() => handleCheckIn(result.id)}>
                      Check In
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CheckInVisitor;
