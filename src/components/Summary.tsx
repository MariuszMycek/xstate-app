import { AddressSummary } from '@/components/AddressSummary';
import { Cart } from '@/components/Cart';
import { PaymentSummary } from '@/components/PaymentSummary';
import { ShippingSummary } from '@/components/ShippingSummary';
import { useScrollTop } from '@/hooks';
import { MachineReactContext } from '@/machines/machine';
import { Alert, Box, Button, Stack } from '@mui/material';
import { useEffect } from 'react';

export const Summary = () => {
  const { cart, address, paymentMethod, shippingMethod } = MachineReactContext.useSelector(
    state => state.context
  );
  const isInAllowedState = MachineReactContext.useSelector(state =>
    state.hasTag('ready_to_confirm')
  );
  const isError = MachineReactContext.useSelector(state => state.hasTag('checkout_error'));
  const actorRef = MachineReactContext.useActorRef();
  const scrollTop = useScrollTop();

  const canShowSummary = isInAllowedState && cart && address;

  useEffect(() => {
    if (isError) {
      scrollTop();
    }
  },[isError]);

  return canShowSummary ? (
    <>
      <Stack spacing={3}>
        {isError && (
          <Alert elevation={1} severity="error" variant="filled">
            An error occurred while completing the order. Please try again.
          </Alert>
        )}

        <Cart isSummary />
        <AddressSummary address={address} />
        <ShippingSummary shippingMethod={shippingMethod} />
        <PaymentSummary paymentMethod={paymentMethod} />
      </Stack>
      <Box pt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => actorRef.send({ type: 'confirm' })}
        >
          Order
        </Button>
      </Box>
    </>
  ) : null;
};
