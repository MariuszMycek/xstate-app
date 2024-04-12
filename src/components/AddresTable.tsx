import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { AddressValues } from './AddressForm';

type AddressTableProps = { address: AddressValues };

export const AddressTable = ({ address }: AddressTableProps) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Address
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="item" width={'250px'}>
                Street
              </TableCell>
              <TableCell component="th" scope="item">
                {address.street}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="item">
                City
              </TableCell>
              <TableCell component="th" scope="item">
                {address.city}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="item">
                Country
              </TableCell>
              <TableCell component="th" scope="item">
                {address.country}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
