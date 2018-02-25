'use strict';
import {List} from 'immutable';
import moment from 'moment';

const enhanceOrders = (array) => {
  const list = List(array);

  Object.assign(List.prototype, orderUtils);
  return list;
};

const orderUtils = {
  
  filterByDate: function(fromDate, toDate) {
    return this.filter(order =>
      moment(order.orderTime).isBetween(fromDate, toDate, null, '[]')
    );
  },
  sortByOrderTime: function() {
    return this.sort((left, right) => moment(left.orderTime).diff(moment(right.orderTime)));
  }

}; 
export default enhanceOrders;
