import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

function InfoPage() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Extension Info
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default InfoPage;
