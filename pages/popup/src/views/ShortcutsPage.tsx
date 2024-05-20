import React from "react";
import ShortcutsList from "../components/ShortcutsList";
import { Grid } from "@mui/material";
import ShortcutListener from "../components/ShortcutListener";

const ShortcutsPage: React.FC<ShortcutsListProps> = ({
  shortcuts,
  setShortcuts,
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ShortcutListener />
        <ShortcutsList shortcuts={shortcuts} setShortcuts={setShortcuts} />
      </Grid>
    </Grid>
  );
};

export default ShortcutsPage;
