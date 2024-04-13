import { MachineReactContext } from '@/machines/machine';
import { FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SubmitButton from './SubmitButton';
import { PaymentMethodValues } from '@/types';

const validationSchema = yup.object({
  paymentMethod: yup.string().required('Please choose payment method'),
});

export const PaymentForm = () => {
  const actorRef = MachineReactContext.useActorRef();
  const paymentMethod = MachineReactContext.useSelector(state => state.context.paymentMethod);
  const paymentOptions = MachineReactContext.useSelector(state => state.context.paymentOptions);

  const { values, handleSubmit, handleChange, touched, errors, submitForm } =
    useFormik<PaymentMethodValues>({
      initialValues: {
        paymentMethod: paymentMethod,
      },
      validationSchema: validationSchema,
      onSubmit: values => {
        actorRef.send({ type: 'select_payment', paymentMethod: values.paymentMethod });
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Paper sx={{ p: 3 }}>
        <FormControl fullWidth error={touched.paymentMethod && Boolean(errors.paymentMethod)}>
          <InputLabel id="select-label">Payment method</InputLabel>
          <Select
            name="paymentMethod"
            labelId="select-label"
            id="paymentMethod"
            label="Payment method"
            value={values.paymentMethod}
            onChange={handleChange}
          >
            {paymentOptions.map(option => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{touched.paymentMethod && errors.paymentMethod}</FormHelperText>
        </FormControl>
      </Paper>
      <SubmitButton />
    </form>
  );
};
