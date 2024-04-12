import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { MachineReactContext } from '../machines/machine';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const Cart = () => {
  const itemList = MachineReactContext.useSelector(state => state.context.cart);
  const actorRef = MachineReactContext.useActorRef();
  return (
    <Box component="section">
      <Typography variant="h5" gutterBottom>
        Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right" sx={{ width: 200 }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ width: 200 }}>
                Shipping
              </TableCell>
              <TableCell align="center" sx={{ width: 200 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {itemList.length ? (
              itemList.map(item => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="item">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="center">
                    {item.isShippingRequired === 'true' ? (
                      <CheckIcon color="secondary" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="error"
                      onClick={() => actorRef.send({ type: 'remove_item', name: item.name })}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="item" colSpan={4} >
                  Your cart is empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
