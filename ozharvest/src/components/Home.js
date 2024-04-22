import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logoutUser, checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  checkAuthStatus();
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
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
      }}>
      <Box
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 10px rgba(0, 0, 0, 1)",
          padding: "20px",
          borderRadius: "10px",
        }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
          onClick={() => navigate("/newvisitor")}>
          Add New Visitor
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/checkin")}
          sx={{ margin: "10px" }}>
          Check-In Visitor
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "10px" }}
          onClick={() => handleLogout()}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
