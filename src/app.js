'use strict';

const getOrders = (argv, dataService, ordersStrategyFactory) => dataService.getJSON(argv.path)
  .then((data) => ordersStrategyFactory
    .create(argv.mode)
    .execute(argv, data))
  .catch((error) => console.log(error));

export default { getOrders };
