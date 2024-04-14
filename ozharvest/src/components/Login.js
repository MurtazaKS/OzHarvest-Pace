import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box component={form} noValidate>
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
            <IconButton onClick={handleShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default Login;
