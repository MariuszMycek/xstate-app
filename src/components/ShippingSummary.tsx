import { ShippingSummaryProps } from '@/types';
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

export const ShippingSummary = ({ shippingMethod }: ShippingSummaryProps) => {
  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Shipping method
      </Typography>
      <TableContainer component={Paper} sx={{ px: 3 }}>
        <Table aria-label="shipping method table">
          <TableBody>
            <TableRow>
              <TableCell component="th">{shippingMethod || 'Skipped'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
