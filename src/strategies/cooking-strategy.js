import { enhanceOrders } from '../utils/orders-utils';

const name = 'Cooking';

const execute = (argv, data) => {
  return ordering(argv, enhanceOrders(data.orders));
};
//#region Private Members

const ordering = (argv, ordersObj) =>
  ordersObj
    .sortByTime(x => x.deliveryTime)
    .filterByTime(x => x.deliveryTime, argv.from, argv.to)
    .flatMap(o =>
      o.items.map(i => {
        i.deliveryTime = o.deliveryTime;
        i.customer = o.customer;
        return i;
      })
    )
    .filter(i => i.type.toLowerCase() === 'dish')
    .toArray();

//#endregion

export default { name, execute };
