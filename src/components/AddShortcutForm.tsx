import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function AddShortcutForm() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const [name, setName] = useState<string>("");
  const [shortcut, setShortcut] = useState<string>("");
  const [icon, setIcon] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newShortcut = { name, shortcut, icon, id: uuidv4() };
    const newShortcuts = [...shortcuts, newShortcut];
    setShortcuts(newShortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
    setName("");
    setShortcut("");
    setIcon("");
  };

  const shortcutKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevents the default input behavior
    const key = event.key.toUpperCase();
    setShortcut(key); // Directly use the event's key
    console.log(`Key pressed: ${key}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            placeholder="Set your shortcut"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Shortcut"
            value={shortcut}
            onKeyDown={shortcutKeyDown}
            placeholder="Set your shortcut"
            onChange={(e) => setShortcut(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Add Shortcut
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddShortcutForm;
