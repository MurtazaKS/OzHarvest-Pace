import { Box, Typography, Button } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        border: "1px solid",
      }}>
      <Button>Add New Visitor</Button>
      <Button>Check-In Visitor</Button>
    </Box>
  );
};

export default Home;
