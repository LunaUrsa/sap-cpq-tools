import React from "react";
import ModList from "../components/ModList";
import { Grid } from "@mui/material";

const ModsPage: React.FC = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <ModList />
        </Grid>
      </Grid>
    </div>
  );
};

export default ModsPage;
