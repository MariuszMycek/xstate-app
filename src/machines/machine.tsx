import { setup, assign, assertEvent } from 'xstate';
import { ItemValues } from '../components/ItemForm';
import { createActorContext } from '@xstate/react';
import { AddressValues } from '../components/AddressForm';
import { ShippingMethods } from '../components/ShippingForm';
import { PaymentMethods } from '../components/PaymentForm';
import { createActor } from 'xstate';
import { createBrowserInspector } from '@statelyai/inspect';

export const machine = setup({
  types: {
    context: {} as {
      cart: ItemValues[];
      address: AddressValues | null;
      shippingMethod: ShippingMethods;
      paymentMethod: PaymentMethods;
    },
    events: {} as
      | { type: 'address'; address: AddressValues }
      | { type: 'complete' }
      | { type: 'skip_payment' }
      | { type: 'skip_shipping' }
      | { type: 'select_payment' }
      | { type: 'select_shipping'; shippingMethod: ShippingMethods }
      | { type: 'remove_item'; name: ItemValues['name'] }
      | { type: 'add_item'; item: ItemValues }
      | { type: 'hide_adding_item_error' },
  },
  actions: {
    add_item_to_cart: assign({
      cart: ({ event, context }) => {
        assertEvent(event, 'add_item');
        return [...context.cart, event.item];
      },
    }),
    remove_item_from_cart: assign({
      cart: ({ event, context }) => {
        assertEvent(event, 'remove_item');
        return context.cart.filter(el => el.name !== event.name);
      },
    }),
    save_address: assign({
      address: ({ event }) => {
        assertEvent(event, 'address');
        return event.address;
      },
    }),
    reset_shipping: assign({
      shippingMethod: ({ event }) => {
        assertEvent(event, 'skip_shipping');
        return '';
      },
    }),
    set_shipping: assign({
      shippingMethod: ({ event }) => {
        assertEvent(event, 'select_shipping');
        return event.shippingMethod;
      },
    }),
    reset_payment: assign({
      paymentMethod: '',
    }),
  },
  guards: {
    is_item_already_in_cart: ({ context, event }) => {
      assertEvent(event, 'add_item');
      return context.cart.map(el => el.name).includes(event.item.name);
    },
  },
}).createMachine({
  context: {
    cart: [],
    address: null,
    shippingMethod: '',
    paymentMethod: '',
  },
  id: 'orderFlow',
  initial: 'cart',
  states: {
    cart: {
      initial: 'adding_item',
      on: {
        address: {
          target: 'addressed',
          actions: 'save_address',
        },
      },
      states: {
        adding_item: {
          on: {
            add_item: [
              {
                target: 'adding_item_error',
                guard: {
                  type: 'is_item_already_in_cart',
                },
              },
              {
                target: 'adding_item',
                actions: 'add_item_to_cart',
              },
            ],
            remove_item: {
              target: 'adding_item',
              actions: 'remove_item_from_cart',
            },
          },
        },
        adding_item_error: {
          on: {
            hide_adding_item_error: {
              target: 'adding_item',
            },
          },
        },
      },
    },
    addressed: {
      on: {
        skip_shipping: {
          target: 'shipping_skipped',
          actions: 'reset_shipping',
        },
        select_shipping: {
          target: 'shipping_selected',
          actions: 'set_shipping',
        },
        address: {
          target: 'addressed',
          actions: 'save_address',
        },
      },
    },
    shipping_skipped: {
      on: {
        skip_payment: {
          target: 'payment_skipped',
        },
        address: {
          target: 'addressed',
        },
        select_payment: {
          target: 'payment_selected',
        },
      },
    },
    shipping_selected: {
      on: {
        address: {
          target: 'addressed',
        },
        select_payment: {
          target: 'payment_selected',
        },
        skip_payment: {
          target: 'payment_skipped',
        },
        select_shipping: {
          target: 'shipping_selected',
        },
      },
    },
    payment_skipped: {
      on: {
        complete: {
          target: 'completed',
        },
        address: {
          target: 'addressed',
        },
        skip_shipping: {
          target: 'shipping_skipped',
        },
        select_shipping: {
          target: 'shipping_selected',
        },
      },
    },
    payment_selected: {
      on: {
        complete: {
          target: 'completed',
        },
        address: {
          target: 'addressed',
        },
        select_shipping: {
          target: 'shipping_selected',
        },
        skip_shipping: {
          target: 'shipping_skipped',
        },
        select_payment: {
          target: 'payment_selected',
        },
      },
    },
    completed: {},
  },
});

export const MachineReactContext = createActorContext(machine);
