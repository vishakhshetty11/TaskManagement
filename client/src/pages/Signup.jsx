import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";

import { toast } from "react-toastify";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // 🔥 VALIDATION
  const validate = () => {
    let tempErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;

    if (!form.first_name) tempErrors.firstName = "First name is required";
    if (!form.last_name) tempErrors.lastName = "Last name is required";

    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Enter valid email address";
    }

    if (!form.mobile) {
      tempErrors.mobile = "Mobile is required";
    } else if (!mobileRegex.test(form.mobile)) {
      tempErrors.mobile = "Enter valid 10-digit mobile number";
    }

    if (!form.password) {
      tempErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      tempErrors.password = "Minimum 6 characters required";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await signup(form);
      toast.success("Signup successful");

      // auto login redirect
      navigate("/");
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb",
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 520,
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* TITLE */}
        <Typography variant="h4" sx={{ mb: 3 }} >
          Signup
        </Typography>

        {/* GRID FORM */}
        <Grid container spacing={1}>
          {/* First Name */}
          <Grid size={{ xs: 12, sm: 6}}>
            <TextField
              fullWidth
              sx={{ width: "100%" }}
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>

          {/* Last Name */}
          <Grid size={{ xs: 12, sm: 6}}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, sm: 6}}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          {/* Mobile */}
          <Grid size={{ xs: 12, sm: 6}}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>

        </Grid>
        {/* Password (full row) */}

        {/* SUBMIT BUTTON */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.2 }}
          onClick={handleSubmit}
        >
          Signup
        </Button>

        {/* LOGIN LINK */}
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "gray" }}
        >
          Already have an account?{" "}
          <span
            style={{
              color: "#1976d2",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;