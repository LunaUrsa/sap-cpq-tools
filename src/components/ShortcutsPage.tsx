import React, { useState, useEffect } from "react";
import ShortcutsList from "./ShortcutsList";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function ShortcutsPage() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    const storedShortcuts = localStorage.getItem("shortcuts");
    setShortcuts(storedShortcuts ? JSON.parse(storedShortcuts) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  const addShortcut = () => {
    const newShortcut = {
      id: uuidv4(),
      key: "",
      destination: "",
      isError: false,
    };
    setShortcuts([...shortcuts, newShortcut]);
  };

  return (
    <div>
      <Button onClick={addShortcut} variant="contained" sx={{ marginTop: 2 }}>
        Add Shortcut
      </Button>
      <ShortcutsList shortcuts={shortcuts} setShortcuts={setShortcuts} />
    </div>
  );
}

export default ShortcutsPage;
