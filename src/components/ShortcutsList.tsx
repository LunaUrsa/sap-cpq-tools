import React from "react";
import { List, ListItem, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ShortcutsList: React.FC<ShortcutsListProps> = ({
  shortcuts,
  setShortcuts,
}) => {
  const handleDelete = (id: string) => {
    setShortcuts(shortcuts.filter((shortcut) => shortcut.id !== id));
  };

  const handleChange = (id: string, field: string, value: string) => {
    setShortcuts(
      shortcuts.map((shortcut) =>
        shortcut.id === id ? { ...shortcut, [field]: value } : shortcut,
      ),
    );
  };

  return (
    <List dense>
      {shortcuts.map((shortcut: Shortcut) => (
        <ListItem key={shortcut.id}>
          <TextField
            value={shortcut.name}
            onChange={(e) => handleChange(shortcut.id, "name", e.target.value)}
            placeholder="Name"
          />
          <TextField
            value={shortcut.key}
            onChange={(e) => handleChange(shortcut.id, "key", e.target.value)}
            placeholder="Shortcut"
          />
          <TextField
            value={shortcut.destination}
            onChange={(e) =>
              handleChange(shortcut.id, "destination", e.target.value)
            }
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
