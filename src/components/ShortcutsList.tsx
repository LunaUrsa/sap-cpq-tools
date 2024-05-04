import React, { useEffect } from "react";
import {
  List,
  ListItem,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import siteMap from "../assets/siteMap.json";

const ShortcutsList: React.FC<ShortcutsListProps> = ({
  shortcuts,
  setShortcuts,
}) => {
  // Get the shortcut list from the local storage
  useEffect(() => {
    const storedShortcuts = localStorage.getItem("shortcuts");
    if (storedShortcuts) {
      try {
        const parsedShortcuts = JSON.parse(storedShortcuts);
        if (Array.isArray(parsedShortcuts)) {
          // Check if it's actually an array
          setShortcuts(parsedShortcuts);
        }
      } catch (e) {
        console.error("Failed to parse shortcuts:", e);
        // Optionally set to a default value or handle the error
      }
    }
  }, [setShortcuts]);

  // When the user leaves the input field, save the shortcuts to the local storage
  const handleBlur = () => {
    console.log("Saving shortcuts to localStorage:", shortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  };

  // Delete the shortcut with the given id
  const handleDelete = (id: string) => {
    const updatedShortcuts = shortcuts.filter((shortcut) => shortcut.id !== id);
    setShortcuts(updatedShortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
  };

  // This handles displaying the menu items in the destination dropdown
  const renderMenuItems = (
    map: Record<string, string | Record<string, unknown>>,
    parentKey = "",
  ): JSX.Element[] => {
    return Object.entries(map).flatMap(([key, value]) => {
      const currentKey = parentKey ? `${parentKey} > ${key}` : key;
      if (typeof value === "string") {
        return (
          <MenuItem key={currentKey} value={currentKey}>
            {currentKey}
          </MenuItem>
        );
      } else {
        return renderMenuItems(value as Record<string, string>, currentKey);
      }
    });
  };

  // This takes the keydown event and sets the key value to the key pressed
  const shortcutKeyDown = (
    id: string,
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    // We capitalize the first letter like this because the user might wanna use Backspace for some reason ig
    const capitalizedKey =
      event.key.slice(0, 1).toUpperCase() + event.key.slice(1);
    handleChange(id, "key", capitalizedKey);
  };

  // This creates a new shortcut with the given id and value
  // and updates the shortcuts list
  const handleChange = (id: string, field: keyof Shortcut, value: string) => {
    const updatedShortcuts = shortcuts.map((shortcut) => {
      if (shortcut.id === id) {
        if (field === "key") {
          // Check for duplicate keys
          const isDuplicate = shortcuts.some(
            (other) => other.key === value && other.id !== id,
          );
          return { ...shortcut, [field]: value, isError: isDuplicate };
        }
        return { ...shortcut, [field]: value };
      }
      return shortcut;
    });
    setShortcuts(updatedShortcuts);
  };

  return (
    <List dense={true}>
      {" "}
      {/* Enable dense layout for the list */}
      {shortcuts.map((shortcut) => (
        <ListItem key={shortcut.id} dense={true}>
          {" "}
          {/* Dense layout for list items */}
          <Grid container spacing={1}>
            {" "}
            {/* Reduced spacing between grid items */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small" // Smaller field size
                label="Shortcut"
                value={shortcut.key}
                onKeyDown={(e) => shortcutKeyDown(shortcut.id, e)}
                onChange={(e) =>
                  handleChange(shortcut.id, "key", e.target.value)
                }
                onBlur={handleBlur}
                placeholder="Shortcut Key"
                error={shortcut.isError}
                helperText={
                  shortcut.isError ? "This key is already in use" : ""
                }
                InputProps={{
                  style: {
                    borderColor: shortcut.isError ? "#ff1744" : "default",
                  },
                }}
                style={shortcut.isError ? { color: "red" } : {}}
              />
            </Grid>
            <Grid item xs={8}>
              <Select
                fullWidth
                size="small" // Smaller select size
                displayEmpty
                value={shortcut.destination}
                placeholder="Select a destination"
                onChange={(e) =>
                  handleChange(shortcut.id, "destination", e.target.value)
                }
                onBlur={handleBlur}
                renderValue={(selected) => {
                  if (selected === "") {
                    return <em>Select a destination</em>; // Placeholder text when nothing is selected
                  }
                  return selected;
                }}
              >
                {renderMenuItems(siteMap)}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                size="small" // Smaller button size
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(shortcut.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default ShortcutsList;
