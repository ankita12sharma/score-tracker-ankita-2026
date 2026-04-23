import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";
import LogoutIcon from "@mui/icons-material/Logout";

function Navigation({ user, onLogout, toggleSidebar }) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
          <Typography sx={{ color: "white", fontWeight: 600 }}>
            Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <StarIcon sx={{ color: "gold" }} />

          <Typography sx={{ color: "white", fontSize: 14 }}>
            {user?.name || "User"}
          </Typography>

          <IconButton onClick={onLogout} sx={{ color: "white" }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
