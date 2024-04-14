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
            display: "flex",
            justifyContent: "space-between",
          }}>
          <img
            src={"https://www.ozharvest.org/assets/images/main-logo.svg"}
            alt="Logo"
            style={{ width: "200px", height: "50px" }}
          />{" "}
          <Box>
            <Button color="secondary" onClick={() => navigate("login")}>
              Log In
            </Button>
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

export default Nav;
