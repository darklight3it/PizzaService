
'use-strict';
import moment from 'moment';

const orderUtils = {
   orderByDate: function(fromDate, toDate){
    return this.filter((order) => moment(order.orderTime).isBetween(fromDate, toDate));
  }
  
  
  /*(fromDate, toDate) => {
    console.log(this.orders);
    //this.filter((order) => moment(order.orderTime).isBetween(fromDate, toDate))
  }*/
}; 
export default orderUtils;
