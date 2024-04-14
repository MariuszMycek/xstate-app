## Order checkout example app - description

This example application presents order checkout flow based on `xstate` state machine. 

The state machine controls the steps and allowed operations for each step - starting from adding products to the cart, ending with submitting the order for processing.

Flow explanation:
1. User can add items to its cart and if there is more than one item in the cart, user can proceed to the checkout phase.
2. In the checkout phase:
- user have to fill address form,
- user have to select shipping method (options depend on previously selected country) - this step is automatically skipped if there are no products requiring shipping in the cart,
- user have to select payment method - this step is automatically skipped if there are no products requiring payment in the cart,
- user can see summary: contents of cart with values and shipping, chosen shipping method (or info if skipped), chosen payment method (or info if skipped).

Every time user can go back to any previous step (clicking the right step in the list) and change the inserted data.

Summary view allows to finalize the order and submit the data to the server.


## Getting Started

1. Clone repo.
2. Install packages

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


