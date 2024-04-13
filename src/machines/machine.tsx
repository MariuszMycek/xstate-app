import { paymentOptions, shippingOptions, steps } from '@/data';
import { ContextType, EventsType, Step, Views } from '@/types';
import { createActorContext } from '@xstate/react';
import { assertEvent, assign, setup } from 'xstate';

export const machine = setup({
  types: { context: {} as ContextType, events: {} as EventsType },
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
        return context.cart.filter(el => el.id !== event.id);
      },
    }),
    save_address: assign({
      address: ({ event }) => {
        assertEvent(event, 'address');
        return event.address;
      },
    }),
    set_shipping_options: assign({
      shippingOptions: ({ context }) => {
        if (context.address) {
          const { country } = context.address;
          return country
            ? shippingOptions.filter(el => el.countries.includes(country)).map(el => el.name)
            : [];
        } else return [];
      },
    }),
    reset_shipping: assign({
      shippingMethod: '',
    }),
    set_shipping: assign({
      shippingMethod: ({ event }) => {
        assertEvent(event, 'select_shipping');
        return event.shippingMethod;
      },
    }),
    set_payment: assign({
      paymentMethod: ({ event }) => {
        assertEvent(event, 'select_payment');
        return event.paymentMethod;
      },
    }),
    reset_payment: assign({
      paymentMethod: '',
    }),
    set_completed_step: assign({
      completedStep: (_, { step }: { step: number }) => step,
    }),
    set_active_step: assign({
      activeStep: (_, { viewName }: { viewName: Views }) => {
        return steps.find(step => viewName === step.view) as Step;
      },
    }),
    change_view: assign({
      activeStep: ({ event }) => {
        assertEvent(event, 'change_view');
        return steps.find(step => event.view === step.view) as Step;
      },
    }),
    add_to_skipped: assign({
      skippedSteps: ({ context }, { step }: { step: number }) => {
        return [...context.skippedSteps, step];
      },
    }),
    reset_skipped: assign({
      skippedSteps: [],
    }),
  },
  guards: {
    is_last_removed: ({ context }) => {
      if (context.cart.length === 1) return true;
      return false;
    },
    shipping_can_be_skipped: ({ context }) => {
      if (context.cart.some(({ isShippingRequired }) => isShippingRequired === 'true'))
        return false;
      return true;
    },
    payment_can_be_skipped: ({ context }) => {
      if (context.cart.some(({ price }) => Number(price) > 0)) return false;
      return true;
    },
  },
}).createMachine({
  context: {
    cart: [],
    address: null,
    shippingMethod: '',
    paymentMethod: '',
    completedStep: null,
    activeStep: steps[0],
    isShippingSkipped: false,
    isPaymentSkipped: false,
    skippedSteps: [],
    shippingOptions: [],
    paymentOptions: paymentOptions,
  },
  id: 'orderFlow',
  initial: 'cart',
  states: {
    cart: {
      initial: 'empty',
      states: {
        empty: {
          on: {
            add_item: {
              target: 'not_empty',
              actions: 'add_item_to_cart',
            },
          },
        },
        not_empty: {
          on: {
            proceed_to_checkout: {
              target: 'checkout',
            },
            add_item: {
              actions: 'add_item_to_cart',
            },
            remove_item: [
              {
                target: 'empty',
                actions: 'remove_item_from_cart',
                guard: 'is_last_removed',
              },
              {
                target: 'not_empty',
                actions: 'remove_item_from_cart',
              },
            ],
          },
        },
        checkout: {
          entry: { type: 'set_active_step', params: { viewName: 'address' } },
          on: {
            address: {
              target: '#orderFlow.addressed',
              actions: ['save_address'],
            },
          },
        },
      },
    },
    addressed: {
      entry: [
        'reset_skipped',
        'reset_payment',
        'reset_shipping',
        { type: 'set_active_step', params: { viewName: 'shipping' } },
        { type: 'set_completed_step', params: { step: 0 } },
        'set_shipping_options',
      ],
      always: [
        {
          target: 'shipping_skipped',
          guard: 'shipping_can_be_skipped',
        },
      ],
      on: {
        change_view: {
          actions: 'change_view',
        },
        select_shipping: {
          target: 'shipping_selected',
          actions: ['set_shipping'],
        },
        address: {
          target: 'addressed',
          actions: [
            'reset_skipped',
            'reset_payment',
            'reset_shipping',
            'save_address',
            { type: 'set_active_step', params: { viewName: 'shipping' } },
            { type: 'set_completed_step', params: { step: 0 } },
            'set_shipping_options',
          ],
        },
      },
    },
    shipping_skipped: {
      entry: [
        'reset_shipping',
        'reset_payment',
        { type: 'set_active_step', params: { viewName: 'payment' } },
        { type: 'set_completed_step', params: { step: 1 } },
        { type: 'add_to_skipped', params: { step: 1 } },
      ],
      always: [
        {
          target: 'payment_skipped',
          guard: 'payment_can_be_skipped',
        },
      ],
      on: {
        change_view: {
          actions: 'change_view',
        },
        address: {
          target: 'addressed',
          actions: ['save_address'],
        },
        select_payment: {
          target: 'payment_selected',
          actions: ['set_payment'],
        },
      },
    },
    shipping_selected: {
      entry: [
        'reset_payment',
        { type: 'set_active_step', params: { viewName: 'payment' } },
        { type: 'set_completed_step', params: { step: 1 } },
      ],
      always: [
        {
          target: 'payment_skipped',
          guard: 'payment_can_be_skipped',
        },
      ],
      on: {
        change_view: {
          actions: 'change_view',
        },
        address: {
          target: 'addressed',
          actions: ['save_address'],
        },
        select_payment: {
          target: 'payment_selected',
          actions: ['set_payment'],
        },
        select_shipping: {
          target: 'shipping_selected',
          actions: [
            'set_shipping',
            'reset_payment',
            { type: 'set_active_step', params: { viewName: 'payment' } },
            { type: 'set_completed_step', params: { step: 1 } },
          ],
        },
      },
    },
    payment_skipped: {
      entry: [
        'reset_payment',
        { type: 'set_active_step', params: { viewName: 'summary' } },
        { type: 'set_completed_step', params: { step: 2 } },
        { type: 'add_to_skipped', params: { step: 2 } },
      ],
      on: {
        change_view: {
          actions: 'change_view',
        },
        complete: {
          target: 'completed',
        },
        address: {
          target: 'addressed',
          actions: ['save_address'],
        },
        select_shipping: {
          target: 'shipping_selected',
          actions: ['set_shipping'],
        },
      },
    },
    payment_selected: {
      entry: [
        { type: 'set_active_step', params: { viewName: 'summary' } },
        { type: 'set_completed_step', params: { step: 2 } },
      ],
      on: {
        change_view: {
          actions: 'change_view',
        },
        complete: {
          target: 'completed',
          actions: [],
        },
        address: {
          target: 'addressed',
          actions: ['save_address'],
        },
        select_shipping: {
          target: 'shipping_selected',
          actions: ['set_shipping'],
        },
        select_payment: {
          target: 'payment_selected',
          actions: [
            'set_payment',
            { type: 'set_active_step', params: { viewName: 'summary' } },
            { type: 'set_completed_step', params: { step: 2 } },
          ],
        },
      },
    },
    completed: {
      entry: [{ type: 'set_completed_step', params: { step: 3 } }],
    },
  },
});

export const MachineReactContext = createActorContext(machine);
