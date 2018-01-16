'use strict';
//import prettyjson from 'prettyJson';

const start = (argv, dataService, ordersUtils) => {

  dataService.getJSON(argv.path)
    .then((data) => {
      Object.assign(data, ordersUtils);
      // return data.orders.orderByDate(argv.from, argv.to);
    })
    .then((data) => console.log(data));
  //  .then((data) => console.log(prettyjson.render(data, {})));
};

const getOrders = (argv, dataService, ordersUtils) => dataService.getJSON(argv.path)
  .then(data => {
    Object.assign(data.orders, ordersUtils);
    return data.orders;
   //return data.orders.orderByDate(argv.from, argv.to);
  });


export default { start, getOrders };
