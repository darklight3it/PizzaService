'use strict';

const getOrders = (argv, dataService, ordersUtils) => dataService.getJSON(argv.path)
  .then(data => enhanceOrders(data, ordersUtils))
  .then(ordersObj => ordering(ordersObj, argv));

//#region Private Members

const enhanceOrders = (data, ordersUtils) => {
  const ordersObj = data.orders;
  Object.assign(ordersObj, ordersUtils);
  return ordersObj;
};

const ordering = (ordersObj, argv) => {
  if (!argv.from && !argv.to) {
    return ordersObj;
  }

  return ordersObj.orderByDate(argv.from, argv.to);
};

//#endregion

export default { getOrders };
