import React from "react";
import { Box, AppBar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
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
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

export default Nav;
