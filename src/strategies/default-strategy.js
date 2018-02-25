'use strict';
import enhanceOrders from '../utils/orders-utils';

const execute = (argv, data) => {  
  return ordering(argv, enhanceOrders(data.orders)); 
};
//#region Private Members

const ordering = (argv, ordersObj) => {

  let result = ordersObj
    .sortByOrderTime()
    .map(o => ({ orderTime: o.orderTime, customer: o.customer }));

  if (!argv.from && !argv.to) {
    return result
      .toArray();
  }

  return result
    .filterByDate(argv.from, argv.to)
    .toArray();
};

//#endregion

export default { execute };
