import { MachineReactContext } from '@/machines/machine';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export const CompletedView = () => {
  const actorRef = MachineReactContext.useActorRef();
  const router = useRouter();
  const backToCart = () => {
    actorRef.send({ type: 'back_to_cart' });
    router.push('/cart');
  };
  return (
    <Stack direction="column" alignItems="center" mt={12}>
      <Typography variant="h5" color="secondary" mb={4}>
        Your order has been submitted
      </Typography>
      <CheckCircleOutlineIcon color="secondary" sx={{ fontSize: 64 }} />
      <Button sx={{ mt: 4 }} onClick={backToCart}>
        Back to shopping
      </Button>
    </Stack>
  );
};

export default CompletedView;
