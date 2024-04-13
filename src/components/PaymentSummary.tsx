import { PaymentSummaryProps } from '@/types';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

export const PaymentSummary = ({ paymentMethod }: PaymentSummaryProps) => {
  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <TableContainer component={Paper} sx={{ px: 3 }}>
        <Table aria-label="payment method table">
          <TableBody>
            <TableRow>
              <TableCell component="th">{paymentMethod || 'Skipped'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
