import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { DataContext } from "../context/dataContext";

const AddNewVisitor = () => {
  const { newCustomer, addIdent, addCustomerAddress } = useContext(DataContext);
  const [visitorID, setVisitorID] = useState("");
  const [document, setDocument] = useState({
    document: "",
    value: "",
  });
  const [address, setAddress] = useState({
    type: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const visitor = {
      title: event.target.title.value,
      firstname: event.target.firstname.value,
      middlename: event.target.middlename.value,
      lastname: event.target.lastname.value,
      birthday: event.target.birthday.value,
      language: event.target.language.value,
    };
    try {
      const response = await newCustomer(visitor);
      setVisitorID(response.id);
      await addIdent(response.id, document.document, document.value);
      await addCustomerAddress(response.id, address);
    } catch (error) {
      console.error("Error creating visitor:", error);
    }
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          padding: "20px",
          borderRadius: "10px",
        }}>
        <Typography variant="h4">Add New Visitor</Typography>
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
          fullWidth
          id="middlename"
          label="Middle Name"
          name="middlename"
          autoComplete="middlename"
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
        <TextField
          type="date"
          margin="normal"
          required
          fullWidth
          id="birthday"
          name="birthday"
          autoComplete="birthday"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="language"
          label="Language"
          name="language"
          autoComplete="language"
          autoFocus
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="document-label">Document</InputLabel>
          <Select
            labelId="document-label"
            required
            name="document"
            id="document"
            onChange={(event) => {
              setDocument({ ...document, document: event.target.value });
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
          type={
            document === "Email"
              ? "email"
              : document === "Phone Number"
              ? "tel"
              : "text"
          }
          margin="normal"
          fullWidth
          required
          onChange={(event) => {
            setDocument({ ...document, value: event.target.value });
          }}
          id="value"
          label="Value"
          name="value"
          autoComplete="value"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="type"
          label="Address Type"
          name="type"
          autoComplete="type"
          autoFocus
          onChange={(event) => {
            setAddress({ ...address, type: event.target.value });
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          onChange={(event) => {
            setAddress({ ...address, address: event.target.value });
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="suburb"
          label="Suburb"
          name="suburb"
          autoComplete="suburb"
          autoFocus
          onChange={(event) => {
            setAddress({ ...address, suburb: event.target.value });
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            id="state"
            name="state"
            value={address.state}
            onChange={(event) => {
              setAddress({ ...address, state: event.target.value });
            }}
            label="State"
            autoFocus>
            <MenuItem value={"New South Wales"}>New South Wales</MenuItem>
            <MenuItem value={"Victoria"}>Victoria</MenuItem>
            <MenuItem value={"Queensland"}>Queensland</MenuItem>
            <MenuItem value={"Western Australia"}>Western Australia</MenuItem>
            <MenuItem value={"South Australia"}>South Australia</MenuItem>
            <MenuItem value={"Tasmania"}>Tasmania</MenuItem>
            <MenuItem value={"Australian Capital Territory"}>
              Australian Capital Territory
            </MenuItem>
            <MenuItem value={"Northern Territory"}>Northern Territory</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          fullWidth
          id="postcode"
          label="Postcode"
          name="postcode"
          autoComplete="postcode"
          autoFocus
          onChange={(event) => {
            setAddress({ ...address, postcode: event.target.value });
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Visitor
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewVisitor;
