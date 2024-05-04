import React, { useEffect, useState } from "react";
import { List, ListItem, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  useEffect(() => {
    const storedShortcuts = localStorage.getItem("shortcuts");
    setShortcuts(storedShortcuts ? JSON.parse(storedShortcuts) : []);
  }, [setShortcuts]);

  const handleChange = (id: string, field: keyof Shortcut, value: string) => {
    const updatedShortcuts = shortcuts.map((shortcut) =>
      shortcut.id === id ? { ...shortcut, [field]: value } : shortcut,
    );
    setShortcuts(updatedShortcuts);
  };

  const handleBlur = () => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  };

  const handleDelete = (id: string) => {
    const updatedShortcuts = shortcuts.filter((shortcut) => shortcut.id !== id);
    setShortcuts(updatedShortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
  };

  return (
    <List dense>
      {shortcuts.map((shortcut) => (
        <ListItem key={shortcut.id}>
          <TextField
            value={shortcut.name}
            onChange={(e) => handleChange(shortcut.id, "name", e.target.value)}
            onBlur={handleBlur}
            placeholder="Name"
          />
          <TextField
            value={shortcut.key}
            onChange={(e) => handleChange(shortcut.id, "key", e.target.value)}
            onBlur={handleBlur}
            placeholder="Shortcut"
          />
          <TextField
            value={shortcut.destination}
            onChange={(e) =>
              handleChange(shortcut.id, "destination", e.target.value)
            }
            onBlur={handleBlur}
            placeholder="Destination URL"
          />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDelete(shortcut.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ShortcutsList;
