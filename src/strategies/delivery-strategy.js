'use strict';
import enhanceOrders from '../utils/orders-utils';

const name = 'Delivery';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) => {
  let orders = ordersObj
    .sortByTime(o => o.deliveryTime)
    .filter(o => o.type.toLowerCase() === 'takeaway')
    .map(o => ({ deliveryTime: o.deliveryTime, distance: o.distance, customer: o.customer, address: o.address, totalQuantity: getTotalQuantity(o.items), totalPrice: getTotalPrice(o.items) }))
    .filterByTime(o => o.deliveryTime, argv.from, argv.to);
  
  return  { orders: orders.toArray(), totalDistance: getTotalDistance(orders)};
}

const getTotalQuantity = (items) => items.map(i => i.quantity).reduce((a, b) => a + b); 
const getTotalPrice = (items) => items.map(i => i.unitPrice * i.quantity).reduce((a, b) => a + b);
const getDistanceInKms = distance => (distance.includes('km') ? 1 : 0.001) * distance.match(/\d+/)[0];
const getTotalDistance = (orders) => orders.map(o => getDistanceInKms(o.distance)).reduce((a, b) => a + b);

//#endregion

export default { name, execute };
