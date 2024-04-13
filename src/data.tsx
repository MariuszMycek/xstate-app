import { AddressForm } from './components/AddressForm';
import { PaymentForm } from './components/PaymentForm';
import { ShippingForm } from './components/ShippingForm';
import { Summary } from './components/Summary';
import { PaymentMethods, ShippingOption, Step } from './types';

export const shippingOptions: ShippingOption[] = [
  {
    name: 'Shipping number One',
    countries: ['Poland'],
  },
  {
    name: 'Shipping number Two',
    countries: ['Poland', 'USA'],
  },
];

export const paymentOptions: PaymentMethods[] = [
  'Payment method number One',
  'Payment method  number Two',
  'Payment method  number Three',
];

export const steps: Step[] = [
  { name: 'Address', component: <AddressForm />, step: 0, view: 'address' },
  { name: 'Shipping method', component: <ShippingForm />, step: 1, view: 'shipping' },
  {
    name: 'Payment method',
    component: <PaymentForm />,
    step: 2,
    view: 'payment',
  },
  { name: 'Summary', component: <Summary />, step: 3, view: 'summary' },
];
