import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // 🔥 EMAIL VALIDATION REGEX
  const validate = () => {
    let tempErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      tempErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      await login(form);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credential");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* TITLE */}
        <Typography variant="h4" mb={3}>
          Login
        </Typography>

        {/* EMAIL */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />

        {/* PASSWORD */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
        />

        {/* LOGIN BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 2, py: 1.2 }}
        >
          Login
        </Button>

        {/* SIGNUP LINK */}
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "gray" }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: "#1976d2",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={() => navigate("/signup")}
          >
            Signup here
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;