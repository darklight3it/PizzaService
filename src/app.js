'use strict';

const getOrders = (argv, dataService, ordersUtils) => dataService.getJSON(argv.path)
  .then(data => enhanceOrders(data, ordersUtils))
  .then(orders => orders.orderByDate(argv.from, argv.to));


const enhanceOrders = (data, ordersUtils) => {
  const orders = data.orders;
  Object.assign(orders, ordersUtils);
  return orders;
}

export default { getOrders };
