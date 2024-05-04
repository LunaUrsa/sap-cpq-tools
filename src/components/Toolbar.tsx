import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
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
          to="/shortcuts"
          startIcon={<SettingsIcon />}
        >
          Shortcuts
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/styling"
          startIcon={<CustomizeIcon />}
        >
          Styling
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default EnhancedToolbar;
