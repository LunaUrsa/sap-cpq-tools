import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

function HomePage() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Important News
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Important things to keep in mind
                </Typography>
                <ul>
                  <li>Comment your code</li>
                  <li>Add type annotations via comments</li>
                  <li>Keep the future in mind: ask GPT to make your code better</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HomePage;