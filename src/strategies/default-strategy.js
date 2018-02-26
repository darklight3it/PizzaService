'use strict';
import enhanceOrders from '../utils/orders-utils';

const name = 'Default';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) => ordersObj
  .sortByOrderTime()
  .map(o => ({ orderTime: o.orderTime, customer: o.customer }))
  .filterByOrderTime(argv.from, argv.to).toArray();

//#endregion

export default { name, execute };
