'use strict';

const getOrders = (argv, dataService, enhanceOrders) => dataService.getJSON(argv.path)
  .then((data) => enhanceOrders(data.orders))
  .then(ordersObj => ordering(ordersObj, argv));

//#region Private Members

const ordering = (ordersObj, argv) => {
  if (!argv.from && !argv.to) {
    return ordersObj;
  }

  return ordersObj
    .filterByDate(argv.from, argv.to)
    .sortBy(o => o.orderTime)
    .toArray();
};

//#endregion

export default { getOrders };
