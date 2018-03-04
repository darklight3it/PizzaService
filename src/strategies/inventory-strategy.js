import { enhanceOrders } from '../utils/orders-utils';

const name = 'Inventory';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) =>
  ordersObj
    .filterByTime(o => o.deliveryTime, argv.from, argv.to)
    .flatMap(o => o.items)
    .sortBy(o => o.name)
    .reduce((accum, i) => {
      if (accum.some(x => stringEquals(x.name, i.name))) {
        accum.find(x => stringEquals(x.name, i.name)).quantity += i.quantity;
        return accum;
      } 
      
      return accum.concat(i);
    }, []);

const stringEquals = (string, anotherString) =>
  string.toLowerCase() === anotherString.toLowerCase();
//#endregion

export default { name, execute };
