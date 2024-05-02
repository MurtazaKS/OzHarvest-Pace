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
  const { newVisitor, addIdent } = useContext(DataContext);
  const [visitorID, setVisitorID] = useState("");
  const [document, setDocument] = useState({
    document: "",
    value: "",
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
      await newVisitor(visitor).then((response) => {
        console.log(response);
        setVisitorID(response.id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDocument = async (event) => {
    try {
      await addIdent(visitorID, document.document, document.value);
    } catch (error) {
      console.error(error);
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
        <Button type="submit" variant="contained" color="primary">
          Add Visitor
        </Button>
      </Box>
      <Box
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddDocument()}>
          Add Document
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewVisitor;
