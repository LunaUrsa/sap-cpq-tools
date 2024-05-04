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

interface Shortcut {
  id: string;
  name: string;
  key: string;
  destination: string;
}

interface ShortcutsListProps {
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
}

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
    const updatedShortcuts = shortcuts.map((shortcut) =>
      shortcut.id === id ? { ...shortcut, [field]: value } : shortcut,
    );
    setShortcuts(updatedShortcuts);
  };

  return (
    <List>
      {shortcuts.map((shortcut) => (
        <ListItem key={shortcut.id}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Shortcut"
                value={shortcut.key}
                onKeyDown={(e) => shortcutKeyDown(shortcut.id, e)}
                onChange={(e) =>
                  handleChange(shortcut.id, "key", e.target.value)
                }
                onBlur={handleBlur}
                placeholder="Shortcut"
              />
            </Grid>
            <Grid item xs={8}>
              <Select
                fullWidth
                displayEmpty
                autoWidth
                renderValue={(value) => (value !== "" ? value : "Destination")}
                value={shortcut.destination}
                onChange={(e) =>
                  handleChange(shortcut.id, "destination", e.target.value)
                }
                onBlur={handleBlur}
                placeholder="Destination URL"
              >
                {renderMenuItems(siteMap)}
              </Select>
            </Grid>
            <Grid item xs={1}>
              <IconButton
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
