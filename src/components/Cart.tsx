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
import { CartProps, ItemValues } from '@/types';

function total(items: readonly ItemValues[]) {
  return items.map(({ price }) => price).reduce((sum, i) => Number(sum) + Number(i) * 100, 0) / 100;
}

export const Cart = ({ isSummary }: CartProps) => {
  const itemList = MachineReactContext.useSelector(state => state.context.cart);
  const actorRef = MachineReactContext.useActorRef();

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Cart
      </Typography>
      <TableContainer component={Paper} sx={{ px: 3 }}>
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right" sx={{ width: 200 }}>
                Price
              </TableCell>
              <TableCell align="center" sx={{ width: 200 }}>
                Shipping
              </TableCell>
              {!isSummary && <TableCell align="center" sx={{ width: 200 }} />}
            </TableRow>
          </TableHead>
          <TableBody>
            {itemList.length ? (
              itemList.map(item => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th">{item.name}</TableCell>
                  <TableCell align="right">{Number(item.price).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    {item.isShippingRequired === 'true' ? (
                      <CheckIcon color="secondary" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </TableCell>

                  {!isSummary && (
                    <TableCell align="center">
                      <Button
                        color="error"
                        onClick={() => actorRef.send({ type: 'remove_item', id: item.id })}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" colSpan={4}>
                  Your cart is empty
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={1} align="right" variant="head">
                Total
              </TableCell>
              <TableCell align="right" colSpan={1} variant="head">
                {total(itemList).toFixed(2)}
              </TableCell>
              <TableCell colSpan={isSummary ? 1 : 2} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
