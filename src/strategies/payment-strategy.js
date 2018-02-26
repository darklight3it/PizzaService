'use strict';
import enhanceOrders from '../utils/orders-utils';

const unitPricePerKm = 1;

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
      totalQuantity: getTotalQuantity(o.items),
      totalPrice: getTotalPrice(o.items),
      deliveryPrice: getDeliveryPrice(o)
    }))
    .filterByTime(o => o.deliveryTime, argv.from, argv.to)
    .toArray();
    
const getTotalQuantity = items =>
  items.map(i => i.quantity).reduce((a, b) => a + b);

const getTotalPrice = items =>
  items.map(i => i.unitPrice * i.quantity).reduce((a, b) => a + b);

const getDeliveryPrice = order => order.type.toLowerCase() === 'takeaway' ? unitPricePerKm * convertOrderDistanceInKm(order.distance) : 0;
const convertOrderDistanceInKm = distance => (distance.includes('km') ? 1 : 0.001) * distance.match(/\d+/)[0];

//#endregion

export default { name, execute };
