import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { AddressTable } from '../src/components/AddresTable';
import { AddressForm } from '../src/components/AddressForm';
import { MachineReactContext } from '../src/machines/machine';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function AddressPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isEdit = !!searchParams.get('edit');

  const enableEdit = () => {
    const params = new URLSearchParams(searchParams);
    params.set('edit', 'true');
    replace(`${pathname}?${params.toString()}`);
  };

  const disableEdit = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('edit');
    replace(`${pathname}?${params.toString()}`);
  };

  const address = MachineReactContext.useSelector(state => state.context.address);
  const showEditForm = !address || isEdit;
  const actorRef = MachineReactContext.useActorRef();
  return (
    <Stack spacing={3}>
      {showEditForm ? (
        <AddressForm disableEdit={disableEdit} address={address} />
      ) : (
        <AddressTable address={address} />
      )}
      {!showEditForm && (
        <>
          <Stack direction="row-reverse">
            <Button variant="contained" color="secondary" onClick={enableEdit}>
              Edit address
            </Button>
          </Stack>
          <Stack direction="row" gap={2}>
            <Button fullWidth variant="contained" color="info" component={Link} href="/shipping">
              Proceed to shipping
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}
