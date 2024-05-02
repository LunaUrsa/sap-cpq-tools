import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomizeIcon from "@mui/icons-material/Tune";
import { Link as RouterLink } from "react-router-dom";

function EnhancedToolbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SAP CPQ Tools
        </Typography>
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
          startIcon={<HomeIcon />}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/settings"
          startIcon={<SettingsIcon />}
        >
          Settings
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/customize"
          startIcon={<CustomizeIcon />}
        >
          Customize
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default EnhancedToolbar;
