import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function SettingsPage() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Recent Activities
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Latest operations and actions
                </Typography>
                <ul>
                  <li>Quote Created</li>
                  <li>Configuration Updated</li>
                  <li>Approval Requested</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  System Status
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Current system health
                </Typography>
                <Typography variant="body2">All systems operational</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Quick Links
                </Typography>
                <Button variant="contained" sx={{ margin: 1 }}>
                  Create Quote
                </Button>
                <Button variant="contained" sx={{ margin: 1 }}>
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SettingsPage;
