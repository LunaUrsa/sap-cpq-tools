import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

// Define the props interface
interface AddShortcutFormProps {
  onAdd: (shortcut: Shortcut) => void;  // Define the function signature
}

function AddShortcutForm() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const [name, setName] = useState<string>('');
  const [shortcut, setShortcut] = useState<string>('');
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevents the default input behavior
    const key = event.key;
    setShortcut(key);  // Directly use the event's key
    console.log(`Key pressed: ${key}`);
  };

  const handleBlur = () => {
      // Optionally clear the key pressed on blur or do other cleanup
      setShortcut('');
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
            onKeyDown={handleKeyDown} 
            onBlur={handleBlur} 
            placeholder="Set your shortcut"
            onChange={(e) => setShortcut(e.target.value)}
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
