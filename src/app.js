'use strict';

import prettyjson from 'prettyJson';

const start = (argv, dataService) => {
  dataService.getJSON(argv.path)
    .then((data) => data.orders.filter((i) => i.customer === 'Luigi'))
    .then((data) => console.log(prettyjson.render(data, {})));
};

export default {start};
