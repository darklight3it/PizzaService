'use strict';
import enhanceOrders from '../utils/orders-utils';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) => ordersObj
    .sortByTime(x => x.deliveryTime)
    .map(o => ({ deliveryTime: o.deliveryTime, customer: o.customer, items: o.items }))
    .filterByTime(x => x.deliveryTime, argv.from, argv.to).toArray();

//#endregion

export default { execute };
