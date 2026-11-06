import React from "react";
import {
  AppBar,
  Box,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ advancedFeatures, setAdvancedFeatures }) {
  const location = useLocation();

  // Helper to determine the context text on the right side of TopBar
  const getContextText = () => {
    const pathname = location.pathname;
    const parts = pathname.split("/").filter(Boolean);

    if (parts.length >= 2 && parts[0] === "users") {
      const userId = parts[1];
      const user = models.userModel(userId);
      return user ? `${user.first_name} ${user.last_name}` : "";
    }

    if (parts.length >= 2 && parts[0] === "photos") {
      const userId = parts[1];
      const user = models.userModel(userId);
      return user ? `Photos of ${user.first_name} ${user.last_name}` : "";
    }

    if (pathname === "/users") {
      return "User List";
    }

    return "";
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>
          Photo Share App
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(advancedFeatures)}
                onChange={(e) => setAdvancedFeatures(e.target.checked)}
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "white" }}>
                Enable Advanced Features
              </Typography>
            }
          />

          <Typography variant="h6" color="inherit">
            {getContextText()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
