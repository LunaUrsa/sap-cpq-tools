import React from "react";
import { Typography, Link, Paper, Box } from "@mui/material";

const InfoPage = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          About Daedalus
        </Typography>
        <Typography variant="body1" paragraph>
          This extension was created by{" "}
          <Link
            href="https://linkedin.com/in/erichoftiezer"
            target="_blank"
            rel="noopener"
          >
            <strong>Eric Hoftiezer</strong>
          </Link>{" "}
          to enhance the functionality and user experience of SAP CPQ. It is
          designed to be simple and intuitive, providing tools to help you get
          your work done.
        </Typography>
        <Typography variant="body1" paragraph>
          The source code is available on{" "}
          <Link
            href="https://github.com/lunaursa/sap-cpq-tools"
            target="_blank"
            rel="noopener"
          >
            <strong>GitHub</strong>
          </Link>{" "}
          and you are encouraged to contribute! Pull requests are very welcome!
          If you have suggestions or improvements, please contribute to this
          project.
        </Typography>
        <Typography variant="body1">
          It&apos;s built with React and uses Material Design styles, providing
          a modern and responsive user interface.
        </Typography>
      </Paper>
    </Box>
  );
};

export default InfoPage;
