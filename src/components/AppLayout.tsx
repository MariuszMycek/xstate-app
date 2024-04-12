import { Box, Container } from '@mui/material';

type AppLayoutProps = {
  children: JSX.Element;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {children}
    </Container>
  );
};
