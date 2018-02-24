'use strict';

const getOrders = (argv, dataService, ordersStrategyFactory) => dataService.getJSON(argv.path)
  .then((data) => ordersStrategyFactory.create())
  .then((strategy, data) => strategy.execute(data, argv));

export default { getOrders };
