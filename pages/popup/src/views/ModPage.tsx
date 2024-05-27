import React from "react";
import ModList from "../components/ModList";
import { Grid } from "@mui/material";

const ModsPage: React.FC<ModListProps> = ({
  mods,
  setMods,
  preferences,
  codeMirrorOptions,
}) => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ModList
            mods={mods}
            setMods={setMods}
            preferences={preferences}
            codeMirrorOptions={codeMirrorOptions}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ModsPage;
