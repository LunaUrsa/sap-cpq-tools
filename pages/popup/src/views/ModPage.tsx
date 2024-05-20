import React from "react";
import ModList from "../components/ModList";
import { Grid } from "@mui/material";

const ModsPage: React.FC<ModListProps> = ({
  mods,
  setMods,
  preferences,
  setPreferences,
}) => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ModList
            mods={mods}
            setMods={setMods}
            preferences={preferences}
            setPreferences={setPreferences}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ModsPage;
