import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

// Define the props interface
interface AddShortcutFormProps {
  onAdd: (shortcut: Shortcut) => void;  // Define the function signature
}

function AddShortcutForm() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const [name, setName] = useState('');
  const [shortcut, setShortcut] = useState('');
  const [icon, setIcon] = useState('');

  const handleAddShortcut = (shortcut: Omit<Shortcut, 'id'>) => {
    const newShortcut = { ...shortcut, id: uuidv4() };
    const newShortcuts = [...shortcuts, newShortcut];
    setShortcuts(newShortcuts);
    localStorage.setItem('shortcuts', JSON.stringify(newShortcuts));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddShortcut({ name, shortcut, icon });
    setName('');
    setShortcut('');
    setIcon('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Shortcut"
            value={shortcut}
            onChange={(e) => setShortcut(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Add Shortcut</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddShortcutForm;
