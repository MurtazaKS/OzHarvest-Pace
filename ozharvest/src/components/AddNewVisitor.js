import React, { useContext } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { DataContext } from "../context/dataContext";

const AddNewVisitor = () => {
  const { newVisitor } = useContext(DataContext);
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
      await newVisitor(visitor);
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
        <Select
          margin="10px"
          fullWidth
          label="Title"
          name="title"
          defaultValue=""
          id="title-select">
          <MenuItem value="Dr">Dr</MenuItem>
          <MenuItem value="Mr">Mr</MenuItem>
          <MenuItem value="Ms">Ms</MenuItem>
          <MenuItem value="Mrs">Mrs</MenuItem>
        </Select>
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
    </Box>
  );
};

export default AddNewVisitor;
