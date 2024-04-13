import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { MachineReactContext } from '../machines/machine';
import { ItemValues } from '@/types';

const validationSchema = yup.object({
  name: yup
    .string()
    .max(20, 'Name should be of maximum 20 characters length')
    .required('Name is required'),
  price: yup.number().min(0).required('Price is required'),
  isShippingRequired: yup.string().required('Please choose one option'),
});

export const ItemForm = () => {
  const actorRef = MachineReactContext.useActorRef();
  const { values, handleSubmit, handleChange, touched, errors, setFieldValue, resetForm } =
    useFormik<Omit<ItemValues, 'id'>>({
      initialValues: {
        name: '',
        price: '',
        isShippingRequired: '',
      },
      validationSchema: validationSchema,
      onSubmit: values => {
        const valuesToSubmit = {
          ...values,
          name: values.name.trim(),
          id: uuidv4(),
        };
        actorRef.send({ type: 'add_item', item: valuesToSubmit });
        resetForm();
      },
    });

  const priceOnChange = (e: React.ChangeEvent<any>) => {
    if (isNaN(Number(e.target.value))) return;

    setFieldValue('price', e.target.value.replace(/(.+\.\d\d)(.+)/, '$1'));
  };

  return (
    <Box component="section">
      <Typography variant="h6" gutterBottom>
        Add an item
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              value={values.price}
              onChange={priceOnChange}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />
            <Box>
              <FormControl error={touched.isShippingRequired && Boolean(errors.isShippingRequired)}>
                <FormLabel component="legend">Shipping</FormLabel>
                <RadioGroup
                  row
                  id="isShippingRequired"
                  name="isShippingRequired"
                  value={values.isShippingRequired}
                  onChange={handleChange}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
                <FormHelperText>
                  {touched.isShippingRequired && errors.isShippingRequired}
                </FormHelperText>
              </FormControl>
            </Box>
          </Stack>

          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" type="submit">
              <AddIcon />
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
