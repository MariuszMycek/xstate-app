import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { MachineReactContext } from '../machines/machine';

export type CountryFieldValue = 'Poland' | 'USA' | '';

export type AddressValues = {
  street: string;
  city: string;
  country: CountryFieldValue;
};

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

type AddressFormProps = { disableEdit: () => void; address: AddressValues | null };

export const AddressForm = ({ disableEdit, address }: AddressFormProps) => {
  const actorRef = MachineReactContext.useActorRef();

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    dirty,
  } = useFormik<AddressValues>({
    initialValues: address
      ? address
      : {
          street: '',
          city: '',
          country: '',
        },
    validationSchema: validationSchema,
    onSubmit: values => {
      const valuesToSubmit = {
        ...values,
        street: values.street.trim(),
        city: values.city.trim(),
      };
      actorRef.send({ type: 'address', address: valuesToSubmit });
      disableEdit();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Address
      </Typography>
      <Stack spacing={3}>
        <Box component="section">
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
        </Box>
        <Stack gap={3} direction="row-reverse">
          <Button variant="contained" color="secondary" type="submit" disabled={!dirty}>
            Save address
          </Button>
          <Button variant="outlined" color="error" onClick={disableEdit} disabled={!address}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
