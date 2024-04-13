import { AppLayoutProps } from '@/types';
import { Container } from '@mui/material';

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {children}
    </Container>
  );
};
