'use strict';
import { enhanceOrders, getOrderTotalQuantity, getOrderTotalPrice } from '../utils/orders-utils';

const name = 'Delivery';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) => {
  let orders = ordersObj
    .sortByTime(o => o.deliveryTime)
    .filter(o => o.type.toLowerCase() === 'takeaway')
    .map(o => ({
      deliveryTime: o.deliveryTime,
      distance: o.distance,
      customer: o.customer,
      address: o.address,
      totalQuantity: getOrderTotalQuantity(o),
      totalPrice: getOrderTotalPrice(o)
    }))
    .filterByTime(o => o.deliveryTime, argv.from, argv.to);
  
  return {orders: orders.toArray(), totalDistance: orders.getTotalDistance(orders)};
};

//#endregion

export default { name, execute };
