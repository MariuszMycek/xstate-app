import { AddressSummaryProps } from '@/types';
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

export const AddressSummary = ({ address }: AddressSummaryProps) => {
  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>
      <TableContainer component={Paper} sx={{ px: 3 }}>
        <Table aria-label="address table">
          <TableBody>
            <TableRow>
              <TableCell component="th" width={'250px'}>
                Street
              </TableCell>
              <TableCell component="th">{address.street}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">City</TableCell>
              <TableCell component="th">{address.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Country</TableCell>
              <TableCell component="th">{address.country}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
