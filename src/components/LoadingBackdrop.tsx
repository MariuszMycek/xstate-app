import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export const LoadingBackdrop = () => {
  return (
    <Backdrop open sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
