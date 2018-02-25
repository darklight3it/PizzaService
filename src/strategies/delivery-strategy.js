'use strict';
import enhanceOrders from '../utils/orders-utils';

const name = 'Delivery';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) => ordersObj
    .sortByTime(o => o.deliveryTime)
    .filter(o => o.type.toLowerCase() === 'takeaway')
    .map(o => ({ deliveryTime: o.deliveryTime, customer: o.customer, address: o.address, totalQuantity: getTotalQuantity(o.items), totalPrice: getTotalPrice(o.items) }))
    .filterByTime(o => o.deliveryTime, argv.from, argv.to).toArray();

const getTotalQuantity = (items) => items.map(i => i.quantity).reduce((a, b) => a + b); 
const getTotalPrice = (items) => items.map(i => i.unitPrice * i.quantity).reduce((a, b) => a + b);

//#endregion

export default { name, execute };
