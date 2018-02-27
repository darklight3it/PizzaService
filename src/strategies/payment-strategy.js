'use strict';
import { enhanceOrders, getOrderTotalPrice, getOrderTotalQuantity, getDeliveryPrice } from '../utils/orders-utils';



const name = 'Payment';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) =>
  ordersObj
    .sortByTime(o => o.deliveryTime)
    .map(o => ({
      deliveryTime: o.deliveryTime,
      distance: o.distance,
      customer: o.customer,
      type: o.type,
      address: o.address,
      totalQuantity: getOrderTotalQuantity(o),
      totalPrice: getOrderTotalPrice(o),
      deliveryPrice: getDeliveryPrice(o)
    }))
    .filterByTime(o => o.deliveryTime, argv.from, argv.to)
    .toArray();

//#endregion

export default { name, execute };
