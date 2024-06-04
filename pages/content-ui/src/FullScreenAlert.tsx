import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';

const FullScreenAlert = ({ open, onClose }: { open: boolean; onClose: (dontShowAgain: boolean) => void }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    onClose(dontShowAgain);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4
      }}>
        <Typography variant="h6" component="h2">
          Entered Full Screen Mode
        </Typography>
        <Typography variant="h6" component="h3">
          Press &lsquo;Esc&rsquo; to exit full screen mode
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={dontShowAgain} onChange={() => setDontShowAgain(!dontShowAgain)} />}
          label="Don't show this again"
        />
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default FullScreenAlert;
