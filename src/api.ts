import { Order } from './types';

export const sendOrder = (data: Order) =>
  fetch(`https://eookbh8ymkwcnq9.m.pipedream.net`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
