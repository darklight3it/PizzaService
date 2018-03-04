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
  },

  getTotalDistance: function() { 
    return this.map(o => convertOrderDistanceInKm(o.distance)).reduce((a, b) => a + b);
  }
};

const getOrderTotalQuantity = order => order.items.map(i => i.quantity).reduce((a, b) => a + b); 
const getOrderTotalPrice = order => order.items.map(i => i.unitPrice * i.quantity).reduce((a, b) => a + b);
const getDeliveryPrice = order => order.type.toLowerCase() === 'takeaway' ? unitPricePerKm * convertOrderDistanceInKm(order.distance) : 0;
;

//#region Private Members
const unitPricePerKm = 1;
const convertOrderDistanceInKm = distance => (distance.includes('km') ? 1 : 0.001) * distance.match(/[+-]?([0-9]*[.])?[0-9]+/)[0];
//#endregion

export { enhanceOrders, getOrderTotalQuantity, getOrderTotalPrice, getDeliveryPrice};
