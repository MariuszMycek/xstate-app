import { MachineReactContext } from '@/machines/machine';
import { Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Cart } from '../src/components/Cart';
import { ItemForm } from '../src/components/ItemForm';
import { useEffect } from 'react';

export default function IndexPage() {
  const isCart = MachineReactContext.useSelector(state => state.hasTag('cart'));
  const canProceedToCheckout = MachineReactContext.useSelector(state =>
    state.matches({ cart: 'not_empty' })
  );
  const isCheckout = MachineReactContext.useSelector(state => state.hasTag('checkout'));
  const actorRef = MachineReactContext.useActorRef();
  const router = useRouter();

  useEffect(() => {
    if (isCheckout) {
      router.push('/checkout', undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onProceed = () => {
    actorRef.send({ type: 'proceed_to_checkout' });
    router.push('/checkout', undefined, { shallow: true });
  };

  return isCart ? (
    <Stack spacing={3}>
      <ItemForm />
      <Cart />
      <Box display="flex" justifyContent="flex-end">
        <Button
          disabled={!canProceedToCheckout}
          variant="contained"
          color="secondary"
          onClick={onProceed}
        >
          Proceed to checkout
        </Button>
      </Box>
    </Stack>
  ) : null;
}
