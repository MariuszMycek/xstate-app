import { FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { MachineReactContext } from '@/machines/machine';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SubmitButton from './SubmitButton';
import { ShippingMethodValues } from '@/types';

const validationSchema = yup.object({
  shippingMethod: yup.string().required('Please choose shipping method'),
});

export const ShippingForm = () => {
  const actorRef = MachineReactContext.useActorRef();
  const shippingMethod = MachineReactContext.useSelector(state => state.context.shippingMethod);
  const shippingOptions = MachineReactContext.useSelector(state => state.context.shippingOptions);

  const { values, handleSubmit, handleChange, touched, errors, submitForm } =
    useFormik<ShippingMethodValues>({
      initialValues: {
        shippingMethod: shippingMethod,
      },
      validationSchema: validationSchema,
      onSubmit: async values => {
        actorRef.send({ type: 'select_shipping', shippingMethod: values.shippingMethod });
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Paper sx={{ p: 3 }}>
        <FormControl fullWidth error={touched.shippingMethod && Boolean(errors.shippingMethod)}>
          <InputLabel id="select-label">Shipping method</InputLabel>
          <Select
            name="shippingMethod"
            labelId="select-label"
            id="shippingMethod"
            label="Shipping method"
            value={values.shippingMethod}
            onChange={handleChange}
          >
            {shippingOptions.map(option => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{touched.shippingMethod && errors.shippingMethod}</FormHelperText>
        </FormControl>
      </Paper>
      <SubmitButton />
    </form>
  );
};
