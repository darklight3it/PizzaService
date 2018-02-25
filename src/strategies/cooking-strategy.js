'use strict';
import enhanceOrders from '../utils/orders-utils';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) => {
  
  let result = ordersObj
    .sortByTime(x => x.deliveryTime)
    .map(o => ({ deliveryTime: o.deliveryTime, customer: o.customer, items: o.items }));

  if (!argv.from && !argv.to) {
    return result.toArray();
  }

  return result.filterByTime(x => x.deliveryTime, argv.from, argv.to).toArray();
};

//#endregion

export default { execute };
