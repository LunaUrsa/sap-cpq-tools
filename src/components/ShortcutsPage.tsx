import React from "react";
import ShortcutsList from "./ShortcutsList";
import { Grid } from "@mui/material";

const ShortcutsPage: React.FC<ShortcutsListProps> = ({
  shortcuts,
  setShortcuts,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ShortcutsList shortcuts={shortcuts} setShortcuts={setShortcuts} />
      </Grid>
    </Grid>
  );
};

export default ShortcutsPage;
