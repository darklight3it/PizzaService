
'use-strict';
import {List} from 'immutable';
import moment from 'moment';

const enhanceOrders = (array) => {
  const list = List(array);
  Object.assign(list, orderUtils);
  return list;
};

const orderUtils = {
  
  filterByDate: function(fromDate, toDate) {
    return this.filter(order =>
      moment(order.orderTime).isBetween(fromDate, toDate)
    );
  }

}; 
export default enhanceOrders;
