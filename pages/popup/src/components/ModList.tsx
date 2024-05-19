import React, { useState } from "react";
import {
  List,
  ListItem,
  TextField,
  IconButton,
  Grid,
  Switch,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModEditor from "./ModEditor";

const ModList: React.FC<ModListProps> = ({
  mods,
  setMods,
  preferences,
  setPreferences,
}) => {
  const [activeEditId, setActiveEditId] = useState<string | null>(null);

  // When the user leaves the input field, save the mods to the local storage
  const handleBlur = () => {
    // console.log("Saving mods to storage:", mods);
    chrome.storage.local.set({ mods: JSON.stringify(mods) });
  };

  // Delete the mod with the given id
  const handleDelete = (id: string) => {
    const updatedMods = mods.filter((mod) => mod.id !== id);
    setMods(updatedMods);
    chrome.storage.local.set({ mods: JSON.stringify(updatedMods) });
  };

  // This creates a new mod with the given id and value
  // and updates the mods list
  const handleChange = (
    id: string,
    field: keyof Mod,
    value: string | boolean,
  ) => {
    const updatedMods = mods.map((mod) => {
      if (mod.id === id) {
        return { ...mod, [field]: value };
      }
      return mod;
    });
    setMods(updatedMods);
  };

  // console.log(mods);

  // Toggle edit mode
  const handleEditToggle = (modId: string) => {
    console.log("Edit toggle:", modId);
    if (activeEditId === modId) {
      setActiveEditId(null); // Close editor if it's already open
    } else {
      setActiveEditId(modId);
    }
  };

  return (
    <List dense={true}>
      {" "}
      {/* Enable dense layout for the list */}
      {mods.map((mod) => (
        <ListItem key={mod.id} dense={true}>
          {" "}
          {/* Dense layout for list items */}
          <Grid container spacing={1}>
            {" "}
            <Grid item xs={5.5}>
              <TextField
                fullWidth
                size="small" // Smaller field size
                label="Name"
                value={mod.name}
                onChange={(e) => handleChange(mod.id, "name", e.target.value)}
                onBlur={handleBlur}
                placeholder="Name"
                error={!mod.isValidCode}
                helperText={!mod.isValidCode ? "This code is not valid!" : ""}
                InputProps={{
                  style: {
                    borderColor: !mod.isValidCode ? "#ff1744" : "default",
                  },
                }}
                style={!mod.isValidCode ? { color: "red" } : {}}
              />
            </Grid>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={1.5}>
              <Switch
                checked={mod.isEnabled}
                onChange={(e) =>
                  handleChange(mod.id, "isEnabled", e.target.checked)
                }
                color="primary" // Sets the color of the switch when it's turned on
                size="medium" // Adjusts the size of the switch
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                size="small" // Smaller button size
                edge="end"
                aria-label="edit"
                onClick={() => handleEditToggle(mod.id)}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                size="small" // Smaller button size
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(mod.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                secondary={
                  activeEditId === mod.id ? (
                    <ModEditor
                      mod={mod}
                      setMod={handleChange}
                      preferences={preferences}
                      setPreferences={setPreferences}
                    />
                  ) : (
                    <></>
                  )
                }
                primaryTypographyProps={{ component: "div" }} // Use div instead of p for primary text
                secondaryTypographyProps={{ component: "div" }} // Use div instead of p for secondary text
              />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default ModList;
