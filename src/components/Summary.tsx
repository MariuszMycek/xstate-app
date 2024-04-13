import { AddressSummary } from '@/components/AddressSummary';
import { Cart } from '@/components/Cart';
import { PaymentSummary } from '@/components/PaymentSummary';
import { ShippingSummary } from '@/components/ShippingSummary';
import { MachineReactContext } from '@/machines/machine';
import { Box, Button, Stack } from '@mui/material';

export const Summary = () => {
  const { cart, address, paymentMethod, shippingMethod } = MachineReactContext.useSelector(
    state => state.context
  );

  const isInAllowedState = MachineReactContext.useSelector(
    state => state.matches('payment_selected') || state.matches('payment_skipped')
  );
  const canShowSummary = isInAllowedState && cart && address;

  return canShowSummary ? (
    <>
      <Stack spacing={3}>
        <Cart isSummary />
        <AddressSummary address={address} />
        <ShippingSummary shippingMethod={shippingMethod} />
        <PaymentSummary paymentMethod={paymentMethod} />
      </Stack>
      <Box pt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary">
          Order
        </Button>
      </Box>
    </>
  ) : null;
};
