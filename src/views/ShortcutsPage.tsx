import { Grid } from "@mui/material"
import React from "react"

import ShortcutsList from "../components/ShortcutsList"

const ShortcutsPage: React.FC<ShortcutsListProps> = ({
  shortcuts,
  setShortcuts
}) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ShortcutsList shortcuts={shortcuts} setShortcuts={setShortcuts} />
      </Grid>
    </Grid>
  )
}

export default ShortcutsPage
