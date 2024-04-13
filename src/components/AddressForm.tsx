import { Stack } from '@mui/material';

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';

import { MachineReactContext } from '@/machines/machine';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import SubmitButton from './SubmitButton';
import { AddressValues } from '@/types';

const validationSchema = yup.object({
  street: yup
    .string()
    .max(20, 'Street should be of maximum 20 characters length')
    .required('Street is required'),
  city: yup
    .string()
    .max(20, 'City should be of maximum 20 characters length')
    .required('City is required'),
  country: yup.string().required('Please choose one option'),
});

export const AddressForm = () => {
  const actorRef = MachineReactContext.useActorRef();
  const address = MachineReactContext.useSelector(state => state.context.address);
  const router = useRouter();

  const { values, handleSubmit, handleChange, touched, errors, submitForm } =
    useFormik<AddressValues>({
      initialValues: address
        ? address
        : {
            street: '',
            city: '',
            country: '',
          },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: values => {
        const valuesToSubmit = {
          ...values,
          street: values.street.trim(),
          city: values.city.trim(),
        };
        actorRef.send({ type: 'address', address: valuesToSubmit });
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Paper sx={{ p: 3 }}>
        <Stack gap={2}>
          <TextField
            fullWidth
            id="street"
            name="street"
            label="Street"
            value={values.street}
            onChange={handleChange}
            error={touched.street && Boolean(errors.street)}
            helperText={touched.street && errors.street}
          />
          <TextField
            fullWidth
            id="city"
            name="city"
            label="City"
            value={values.city}
            onChange={handleChange}
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city && errors.city}
          />
          <Box>
            <FormControl fullWidth error={touched.country && Boolean(errors.country)}>
              <InputLabel id="select-label">Country</InputLabel>
              <Select
                name="country"
                labelId="select-label"
                id="country"
                label="Country"
                value={values.country}
                onChange={handleChange}
              >
                <MenuItem value="Poland">Poland</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
              </Select>
              <FormHelperText>{touched.country && errors.country}</FormHelperText>
            </FormControl>
          </Box>
        </Stack>
      </Paper>
      <SubmitButton />
    </form>
  );
};
