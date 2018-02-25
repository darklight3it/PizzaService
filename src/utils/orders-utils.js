'use strict';
import { List } from 'immutable';
import moment from 'moment';

const enhanceOrders = array => {
  const list = List(array);

  Object.assign(List.prototype, orderUtils);
  return list;
};

const orderUtils = {
  filterByOrderTime: function(fromDate, toDate) {
    return this.filterByTime(x => x.orderTime, fromDate, toDate);
  },
  filterByTime: function(fn, fromDate, toDate) {

    if (!fromDate || !toDate) {
      return this;
    }

    return this.filter(order =>
      moment(fn(order)).isBetween(fromDate, toDate, null, '[]')
    );
  },
  sortByOrderTime: function() {
    return this.sortByTime(x => x.orderTime);
  },
  sortByTime: function(fn) {
    return this.sort((left, right) => moment(fn(left)).diff(moment(fn(right))));
  }
};
export default enhanceOrders;
