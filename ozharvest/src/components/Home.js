import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const { logoutUser } = useContext(AuthContext);
  const handleLogout = () => {
    logoutUser();
    const token = localStorage.getItem("token");
    console.log(token);
  };
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        border: "1px solid",
      }}>
      <Button variant="contained" color="primary" sx={{ margin: "20px" }}>
        Add New Visitor
      </Button>
      <Button variant="contained" color="primary" sx={{ margin: "20px" }}>
        Check-In Visitor
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: "20px" }}
        onClick={() => handleLogout()}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
