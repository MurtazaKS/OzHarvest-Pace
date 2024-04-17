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
        <TextField />
        <TextField />
        <TextField />
        <TextField />
      </Box>
    </Box>
  );
};

export default AddNewVisitor;
