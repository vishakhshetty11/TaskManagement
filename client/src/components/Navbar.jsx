import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  // 🔥 CONCAT FIRST + LAST NAME
  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* LEFT SIDE */}
        <Typography variant="h6" fontWeight="bold">
          Task Management
        </Typography>

        {/* RIGHT SIDE (CLICKABLE AREA) */}
        <Box>
          <Button
            onClick={handleOpen}
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "16px",
              display: "flex",
              gap: 1,
            }}
          >
            {fullName || "User"}
            <span style={{ fontSize: "14px" }}>▼</span>
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;