import { Button, Stack } from '@mui/material';
import { Cart } from '../src/components/Cart';
import { ItemForm } from '../src/components/ItemForm';
import { MachineReactContext } from '../src/machines/machine';
import Link from 'next/link';

export default function IndexPage() {
  const cart = MachineReactContext.useSelector(state => state.context.cart);

  return (
    <Stack spacing={3}>
      <ItemForm />
      <Cart />
      <Button
        disabled={!cart.length}
        variant="contained"
        color="secondary"
        component={Link}
        href="/address"
      >
        Proceed
      </Button>
    </Stack>
  );
}
