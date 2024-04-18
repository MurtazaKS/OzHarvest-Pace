import React, { useContext } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const AddNewVisitor = () => {
  const handleSubmit = async (event) => {};
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
          required
          fullWidth
          id="lastname"
          label="Last Name"
          name="lastname"
          autoComplete="lastname"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="typeofdoc"
          label="Type of Document"
          name="typeofdoc"
          autoComplete="typeofdoc"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="documentid"
          label="Document ID"
          name="documentid"
          autoComplete="documentid"
          autoFocus
        />
      </Box>
    </Box>
  );
};

export default AddNewVisitor;
