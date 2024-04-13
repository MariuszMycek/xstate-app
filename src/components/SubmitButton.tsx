import { Box, Button } from '@mui/material';
import React from 'react';

export const SubmitButton = () => {
  return (
    <Box pt={2} display="flex" justifyContent="flex-end">
      <Button type="submit">Next</Button>
    </Box>
  );
};

export default SubmitButton;
