export type ShippingMethods = 'Shipping number One' | 'Shipping number Two' | '';

export type ShippingOption = {
  name: ShippingMethods;
  countries: CountryFieldValue[];
};

export type PaymentMethods =
  | 'Payment method number One'
  | 'Payment method  number Two'
  | 'Payment method  number Three'
  | '';

export type CountryFieldValue = 'Poland' | 'USA' | '';

export type AddressValues = {
  street: string;
  city: string;
  country: CountryFieldValue;
};

export type AddressSummaryProps = {
  address: AddressValues;
};

export type AppLayoutProps = {
  children: JSX.Element;
};

export type CartProps = {
  isSummary?: boolean;
};

export type IsShippingRequiredFieldValue = 'true' | 'false' | '';

export type ItemValues = {
  name: string;
  price: string;
  isShippingRequired: IsShippingRequiredFieldValue;
};

export type PaymentMethodValues = {
  paymentMethod: PaymentMethods;
};

export type PaymentSummaryProps = {
  paymentMethod: PaymentMethods;
};

export type ShippingMethodValues = {
  shippingMethod: ShippingMethods;
};

export type ShippingSummaryProps = {
  shippingMethod: ShippingMethods;
};

export type Views = 'address' | 'shipping' | 'payment' | 'summary';

export type Step = {
  name: string;
  component: JSX.Element;
  step: number;
  view: Views;
};

export type EventsType =
  | { type: 'address'; address: AddressValues }
  | { type: 'complete' }
  | { type: 'skip_payment' }
  | { type: 'skip_shipping' }
  | { type: 'select_payment'; paymentMethod: PaymentMethods }
  | { type: 'select_shipping'; shippingMethod: ShippingMethods }
  | { type: 'remove_item'; name: ItemValues['name'] }
  | { type: 'add_item'; item: ItemValues }
  | { type: 'proceed_to_checkout' }
  | { type: 'change_view'; view: Views }
  | { type: 'confirm' }
  | { type: 'back_to_cart' };

export type ContextType = {
  cart: ItemValues[];
  address: AddressValues | null;
  shippingMethod: ShippingMethods;
  paymentMethod: PaymentMethods;
  completedStep: number | null;
  activeStep: Step;
  isShippingSkipped: boolean;
  isPaymentSkipped: boolean;
  skippedSteps: number[];
  shippingOptions: ShippingMethods[];
  paymentOptions: PaymentMethods[];
};

export type Order = {
  cart: ItemValues[];
  address: AddressValues;
  shippingMethod: ShippingMethods;
  paymentMethod: PaymentMethods;
};
