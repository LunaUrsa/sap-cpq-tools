import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomizeIcon from "@mui/icons-material/Tune";
import HelpIcon from "@mui/icons-material/Help";
import { Link as RouterLink } from "react-router-dom";
import { Functions, AddCircle } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import * as themes from "@uiw/codemirror-themes-all";

const EnhancedToolbar: React.FC<ToolbarProps> = ({
  mods,
  setMods,
  shortcuts,
  setShortcuts,
  preferences,
  setPreferences,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const addStyle = () => {
    const newStyle = {
      id: uuidv4(),
      name: "",
      content: "",
      isEnabled: true,
      isValidLanguage: true,
      isValidCode: true,
      language: "javascript",
    };
    setMods([...mods, newStyle]);
  };

  const titles: Record<string, string> = {
    "#/shortcut": "Shortcuts",
    "#/styling": "Mods",
    "#/formulas": "Formula Format",
    "#/info": "Information",
  };

  // Default title
  const title = titles[location.hash] || "SAP CPQ Tools";

  const themeOptions = ["dark", "light"]
    .concat(Object.keys(themes))
    .filter((item) => typeof themes[item as keyof typeof themes] !== "function")
    .filter((item) => !/^(defaultSettings)/.test(item as keyof typeof themes));

  const addShortcut = () => {
    const newShortcut = {
      id: uuidv4(),
      key: "",
      destination: "",
      isUnique: true,
      isValidDestination: true,
    };
    setShortcuts([...shortcuts, newShortcut]);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mt: 0.5 }}
            >
              {title}
            </Typography>
          </Grid>
          {location.hash === "#/styling" ? (
            <>
              <Grid item xs={4}>
                <FormControl
                  fullWidth
                  sx={{
                    mt: 0.5,
                  }}
                >
                  <InputLabel
                    id="theme-label"
                    sx={{
                      color: "white",
                    }}
                  >
                    Theme
                  </InputLabel>
                  <Select
                    labelId="theme-label"
                    value={preferences ? preferences.codeMirrorTheme : "abcdef"}
                    label="Theme"
                    onChange={(e) => {
                      setPreferences({
                        ...preferences,
                        codeMirrorTheme: e.target.value,
                      });
                    }}
                    sx={{
                      color: "white",
                      fontSize: "0.875rem", // smaller font size
                      maxHeight: "40px", // smaller height for the select input
                      "& .MuiSelect-select": {
                        // targeting the inner select element
                        paddingTop: "6px",
                        paddingBottom: "6px",
                      },
                    }}
                  >
                    {themeOptions.map((theme) => (
                      <MenuItem key={theme} value={theme}>
                        {theme}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={addStyle}
                  sx={{ mr: 2 }}
                >
                  <AddCircle />
                </IconButton>
              </Grid>
            </>
          ) : null}
          {location.hash === "#/shortcut" ? (
            <>
              <Grid item xs={4}></Grid>
              <Grid item xs={1}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={addShortcut}
                  sx={{ mr: 2 }}
                >
                  <AddCircle />
                </IconButton>
              </Grid>
            </>
          ) : null}
          {location.hash === "#/formula" ? <Grid item xs={5}></Grid> : null}
          <Grid item xs={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={openMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem
                onClick={closeMenu}
                component={RouterLink}
                to="/shortcut"
              >
                <SettingsIcon />
                Shortcuts
              </MenuItem>
              <MenuItem
                onClick={closeMenu}
                component={RouterLink}
                to="/styling"
              >
                <CustomizeIcon />
                Mods
              </MenuItem>
              <MenuItem
                onClick={closeMenu}
                component={RouterLink}
                to="/formula"
              >
                <Functions />
                Formula Format
              </MenuItem>
              <MenuItem onClick={closeMenu} component={RouterLink} to="/info">
                <HelpIcon />
                Info
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default EnhancedToolbar;
