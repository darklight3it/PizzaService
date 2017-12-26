'use strict';
import prettyjson from 'prettyJson';

const start = (argv, dataService, ordersUtils) => {
  
  dataService.getJSON(argv.path)
    .then((data) => {
      Object.assign(data, ordersUtils);
      console.log(data);
     // return data.orders.orderByDate(argv.from, argv.to);
    })
    .then((data) => console.log(prettyjson.render(data, {})));
};

export default {start};
