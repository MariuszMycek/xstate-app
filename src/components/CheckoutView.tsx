import { MachineReactContext } from '@/machines/machine';
import Box from '@mui/material/Box';
import LoadingBackdrop from './LoadingBackdrop';
import CompletedView from './CompletedView';

const CheckoutView = () => {
  const activeStep = MachineReactContext.useSelector(state => state.context.activeStep);
  const isCheckout = MachineReactContext.useSelector(state => state.hasTag('checkout'));
  const isCompleted = MachineReactContext.useSelector(state => state.hasTag('completed'));
  const loading = MachineReactContext.useSelector(state => state.hasTag('loading'));

  return (
    <Box mt={4} component="section">
      {loading && <LoadingBackdrop />}
      {isCheckout && activeStep.component}
      {isCompleted && <CompletedView/>}
    </Box>
  );
};

export default CheckoutView;
