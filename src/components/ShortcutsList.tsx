import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

const ShortcutsList: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    // Fetch shortcuts from local storage or use default
    const storedShortcuts = localStorage.getItem("shortcuts");
    if (storedShortcuts) {
      setShortcuts(JSON.parse(storedShortcuts));
    } else {
      // Default shortcuts
      setShortcuts([
        {
          id: uuidv4(),
          name: "Go to Google",
          key: "G",
          destination: "https://script.google.com/home",
        },
        {
          id: uuidv4(),
          name: "Open Scripts",
          key: "S",
          destination: "https://script.google.com/home",
        },
      ]);
    }
  }, []);

  const handleDelete = (index: number) => {
    const newShortcuts = [...shortcuts];
    newShortcuts.splice(index, 1);
    setShortcuts(newShortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
  };

  return (
    <List dense>
      {shortcuts.map((shortcut, index) => (
        <ListItem
          key={shortcut.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={shortcut.name} secondary={shortcut.key} />
        </ListItem>
      ))}
    </List>
  );
};

export default ShortcutsList;
