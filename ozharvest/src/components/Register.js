import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState(new FormData());
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        user
      );
      const token = response.data.token;
      // Save the token to localStorage or use it as needed
      navigate("/login");
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
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
        component="form"
        onSubmit={handleSubmit}
        noValidate
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
        <Typography variant="h4">Register Form</Typography>
        <TextField
          {...(error && { error: true, helperText: error })}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          {...(error && { error: true, helperText: error })}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          {...(error && { error: true, helperText: error })}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Button>Hide</Button> : <Button>Show</Button>}
              </IconButton>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="primary">
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
