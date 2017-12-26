'use-strict';
import moment from 'moment';

const orderUtils = {
  orderByDate: (fromDate, toDate) => this.filter((order) => moment(order.orderTime).isBetween(fromDate, toDate))
}; 

export default { orderUtils };
