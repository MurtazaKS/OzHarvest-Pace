import React, { useContext, useState } from "react";
import { Box, AppBar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Nav = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <>
      <AppBar color="primary" position="relative">
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <img
            src={"https://www.ozharvest.org/assets/images/main-logo.svg"}
            alt="Logo"
            style={{ width: "200px", height: "50px" }}
          />{" "}
          <Box>
            {!user ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={() => navigate("/home")}>
                  Home
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: "10px" }}
                  onClick={handleLogout}>
                  Log out
                </Button>
              </>
            )}
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

export default Nav;
