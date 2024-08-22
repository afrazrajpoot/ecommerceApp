// pages/payment.js

import { useEffect } from 'react';
import { loadScript } from '@paypal/paypal-js';

const CheckoutButton = ({ checkoutDetail }) => {
  useEffect(() => {
    loadScript({ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }).then((paypal) => {
      paypal.Buttons({
        createOrder: (data, actions) => {
          const items = checkoutDetail?.map(product => ({
            name: product?.name,
            unit_amount: {
              currency_code: "USD",
              value: parseFloat(product?.sale_price || product?.regular_price).toFixed(2)
            },
            quantity: "1"
          }));
    
          const itemTotal = items.reduce((total, item) => total + parseFloat(item?.unit_amount.value) * parseInt(item?.quantity), 0).toFixed(2);
    
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalPrice.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: itemTotal
                  }
                }
              },
              items: items
            }]
          });
        },
        // Your other configurations, like onApprove, onCancel, onError, etc.
      }).render('#paypal-button-container');
    });
  }, [checkoutDetail]);

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default CheckoutButton;
