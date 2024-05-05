import React, { useEffect, useState } from "react";
import { List, ListItem, TextField, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import siteMap from "../assets/siteMap.json";
import Autocomplete from "@mui/material/Autocomplete";

const ShortcutsList: React.FC<ShortcutsListProps> = ({
  shortcuts,
  setShortcuts,
}) => {
  const [destination, setDestination] = useState<string>("");
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
    // console.log("Saving shortcuts to localStorage:", shortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  };

  // Delete the shortcut with the given id
  const handleDelete = (id: string) => {
    const updatedShortcuts = shortcuts.filter((shortcut) => shortcut.id !== id);
    setShortcuts(updatedShortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
  };

  // This handles displaying the menu items in the destination dropdown
  // Prepare options from siteMap for the Autocomplete component
  const destinationOptions = Object.entries(siteMap).flatMap(([key, value]) => {
    return Object.entries(value).map(([subKey]) => {
      if (subKey) {
        return `${key} > ${subKey}`;
      }
      return key;
    });
  });

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

  function validateURL(url: string): boolean {
    const pattern =
      /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]+)*\/?$/i;
    return pattern.test(url);
  }

  // This creates a new shortcut with the given id and value
  // and updates the shortcuts list
  const handleChange = (id: string, field: keyof Shortcut, value: string) => {
    console.debug("Updating shortcut:", id, field, value);
    const updatedShortcuts = shortcuts.map((shortcut) => {
      if (shortcut.id === id) {
        if (field === "key") {
          // Check for duplicate keys
          const isDuplicate = shortcuts.some(
            (other) => other.key === value && other.id !== id,
          );
          return { ...shortcut, [field]: value, isDuplicated: isDuplicate };
        }
        if (field === "destination") {
          // Check if the destination is valid
          const isValidDestination =
            (destinationOptions.includes(value) && !value.startsWith("You")) ||
            validateURL(value);
          console.log("isValidDestination", isValidDestination);
          return { ...shortcut, [field]: value, isValidDestination };
        }
        return { ...shortcut, [field]: value };
      }
      return shortcut;
    });
    setShortcuts(updatedShortcuts);
  };

  // console.log(shortcuts);

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
                error={!shortcut.isUnique}
                helperText={
                  !shortcut.isUnique ? "This key is already in use" : ""
                }
                InputProps={{
                  style: {
                    borderColor: !shortcut.isUnique ? "#ff1744" : "default",
                  },
                }}
                style={!shortcut.isUnique ? { color: "red" } : {}}
              />
            </Grid>
            <Grid item xs={8}>
              <Autocomplete
                fullWidth
                freeSolo // Allows users to enter custom options
                size="small" // Smaller select size
                value={shortcut.destination}
                onInputChange={(event, newInputValue) => {
                  setDestination(newInputValue);
                }}
                onChange={(e, newValue) =>
                  handleChange(shortcut.id, "destination", newValue ?? "")
                }
                options={destinationOptions}
                onBlur={() => {
                  handleChange(shortcut.id, "destination", destination);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Destination"
                    variant="outlined"
                    fullWidth
                    error={!shortcut.isValidDestination}
                    helperText={
                      !shortcut.isValidDestination ? "Invalid URL" : ""
                    }
                    inputProps={{
                      ...params.inputProps,
                      style: {
                        color: !shortcut.isValidDestination ? "red" : undefined,
                      },
                    }}
                  />
                )}
              />
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
