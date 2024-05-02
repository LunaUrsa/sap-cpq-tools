import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function AddShortcutForm() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [destination, setDestination] = useState<string>(""); // State to store the last key before the value

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If either of the fields are empty, ignore the submission
    if (!destination || !key) {
      return;
    }

    // If the Shortcut is already in use, ignore the submission
    if (shortcuts.some((s) => s.key === key)) {
      return;
    }

    const newShortcut = { name, key, destination, id: uuidv4() };
    const newShortcuts = [...shortcuts, newShortcut];
    setShortcuts(newShortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
    setName("");
    setKey("");
    setDestination("");
  };

  const handleDestinationChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target);
    setDestination(event.target.value);
  };

  const siteMap = {
    development: {
      "script workbench": "https://script.google.com/home",
    },
    setup: {
      quotes: {
        "quote tables": "https://app.quotientapp.com/tables",
      },
    },
    products: {
      attributes: {
        permissions: {
          "attribute permissions": "https://app.quotientapp.com/permissions",
        },
      },
    },
  } as NestedStringMap;

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

  const shortcutKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Capitalize the first letter
    setKey(event.key.slice(0, 1).toUpperCase() + event.key.slice(1));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            placeholder="Custom name"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Shortcut"
            value={key}
            onKeyDown={shortcutKeyDown}
            onChange={(e) => setKey(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            autoWidth={true}
            displayEmpty={true}
            renderValue={(value) => (value != "" ? value : "Destination")}
            value={destination} // Use lastKey state to control the value of the Select menu
            onChange={handleDestinationChange}
          >
            {renderMenuItems(siteMap)}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: destination && key ? "primary.main" : "grey",
              ":hover": {
                backgroundColor:
                  destination && key ? "primary.dark" : "grey.dark",
              },
              opacity: destination && key ? 1 : 0.5,
            }}
          >
            Add Shortcut
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddShortcutForm;
