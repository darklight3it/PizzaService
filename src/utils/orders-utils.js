'use-strict';
import moment from 'moment';

const orderUtils = {
  orderByDate: (fromDate, toDate) => {
    console.log(this)
    this.filter((order) => moment(order.orderTime).isBetween(fromDate, toDate)
  )}
}; 

export default orderUtils;
