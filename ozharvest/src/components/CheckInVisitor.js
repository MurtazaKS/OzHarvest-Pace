import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/dataContext";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

const CheckInVisitor = () => {
  const {
    searchCustomer,
    checkInCustomer,
    getCustomers,
    searchCustomerByIdent,
  } = useContext(DataContext);
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState("");
  const [value, setValue] = useState(0);
  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });
  const [ident, setIdent] = useState({
    document: "",
    id: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchByName = async (event) => {
    event.preventDefault();
    const customer = {
      firstname: name.firstname,
      lastname: name.lastname,
    };

    try {
      const response = await searchCustomer(customer);
      setSearchResults(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchById = async (event) => {
    event.preventDefault();

    try {
      const response = await searchCustomerByIdent(ident.document, ident.id);
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
    <Box component="form">
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Search by Name" />
        <Tab label="Search by ID" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="First Name"
          name="firstname"
          autoComplete="firstname"
          autoFocus
          value={name.firstname}
          onChange={(e) => setName({ ...name, firstname: e.target.value })}
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
          value={name.lastname}
          onChange={(e) => setName({ ...name, lastname: e.target.value })}
        />
        <Button
          onClick={(e) => handleSearchByName(e)}
          variant="contained"
          type="submit">
          Search
        </Button>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="document-label">Document</InputLabel>
          <Select
            labelId="document-label"
            required
            name="document"
            id="document"
            value={ident.document}
            onChange={(event) => {
              setIdent({ ...ident, document: event.target.value });
            }}
            label="Document">
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Phone Number">Phone Number</MenuItem>
            <MenuItem value="Driver Licence Number">
              Driver Licence Number
            </MenuItem>
            <MenuItem value="Passport Number">Passport Number</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="id"
          label="Id"
          name="id"
          value={ident.id}
          onChange={(event) => {
            setIdent({ ...ident, id: event.target.value });
          }}
          autoFocus
        />
        <Button
          onClick={(e) => handleSearchById(e)}
          variant="contained"
          type="submit">
          Search
        </Button>
      </TabPanel>

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
            {searchResults?.map((result, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/customer/${result.id}`}>
                    {result.firstname} {result.lastname}
                  </Link>
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
