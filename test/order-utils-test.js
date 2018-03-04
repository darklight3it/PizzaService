import sinon from 'sinon';
import chai from 'chai';
import { enhanceOrders, getOrderTotalQuantity, getOrderTotalPrice, getDeliveryPrice } from '../src/utils/orders-utils.js';

describe('Order Utils', () => {
  describe('filterByOrderTime', () => {
    let sandBox = sinon.sandbox.create();
    let orderObj = enhanceOrders([
      { orderId: 1, orderTime: '2017-11-24 11:00' },
      { orderId: 2, orderTime: '2018-11-24 11:00' }
    ]);

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('should return all orders by date', () => {
      var result = orderObj
        .filterByOrderTime('2017-01-01', '2019-01-01')
        .toArray();

      chai.assert.equal(result.length, 2);
    });

    it('should filter the number of dates', () => {
      var result = orderObj
        .filterByOrderTime('2018-01-01', '2019-01-01')
        .toArray();

      chai.assert.equal(result.length, 1);
    });

    it('should include boundaries', () => {
      var result = orderObj
        .filterByOrderTime('2017-11-24 11:00', '2018-11-24 11:00')
        .toArray();

      chai.assert.equal(result.length, 2);
    });

    it('should return no order at all if dates outside boundaries are chosen', () => {
      var result = orderObj
        .filterByOrderTime('2019-01-01', '2020-01-01')
        .toArray();

      chai.assert.equal(result.length, 0);
    });
  });

  describe('filterByTime', () => {
    let sandBox = sinon.sandbox.create();
    let orderObj = enhanceOrders([
      { orderId: 1, orderTime: '2017-11-24 11:00' },
      { orderId: 2, orderTime: '2018-11-24 11:00' }
    ]);

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('should return all orders by date if the boundaries is big enough', () => {
      var result = orderObj
        .filterByTime(x => x.orderTime, '2017-01-01', '2019-01-01')
        .toArray();

      chai.assert.equal(result.length, 2);
    });

    it('should filter the number of dates', () => {
      var result = orderObj
        .filterByTime(x => x.orderTime, '2018-01-01', '2019-01-01')
        .toArray();

      chai.assert.equal(result.length, 1);
    });

    it('should include boundaries', () => {
      var result = orderObj
        .filterByTime(x => x.orderTime, '2017-11-24 11:00', '2018-11-24 11:00')
        .toArray();

      chai.assert.equal(result.length, 2);
    });

    it('should return no order at all if dates outside boundaries are chosen', () => {
      var result = orderObj
        .filterByTime(x => x.orderTime, '2019-01-01', '2020-01-01')
        .toArray();

      chai.assert.equal(result.length, 0);
    });

    it('should not filter if dates are not provided', () => {
      var result = orderObj.filterByTime(x => x.orderTime).toArray();

      chai.assert.equal(result.length, 2);
    });
  });

  describe('sortByOrderTime', () => {
    let sandBox = sinon.sandbox.create();
    let orderObj = enhanceOrders([
      { orderId: 5, orderTime: '2021-01-20 11:00' },
      { orderId: 1, orderTime: '2017-11-24 11:00' },
      { orderId: 2, orderTime: '2018-11-25 11:00' },
      { orderId: 3, orderTime: '2017-11-24 11:01' },
      { orderId: 4, orderTime: '2018-12-30 11:00' }
    ]);

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });
    it('should correctly order the by orderTime', () => {
      var result = orderObj.sortByOrderTime().toArray();

      chai.assert.equal(result[0].orderId, 1);
      chai.assert.equal(result[1].orderId, 3);
      chai.assert.equal(result[2].orderId, 2);
      chai.assert.equal(result[3].orderId, 4);
      chai.assert.equal(result[4].orderId, 5);
    });
  });

  describe('sortByTime', () => {
    let sandBox = sinon.sandbox.create();
    let orderObj = enhanceOrders([
      { orderId: 5, orderTime: '2021-01-20 11:00' },
      { orderId: 1, orderTime: '2017-11-24 11:00' },
      { orderId: 2, orderTime: '2018-11-25 11:00' },
      { orderId: 3, orderTime: '2017-11-24 11:01' },
      { orderId: 4, orderTime: '2018-12-30 11:00' }
    ]);

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });
    it('should correctly order the by time', () => {
      var result = orderObj.sortByTime(x => x.orderTime).toArray();

      chai.assert.equal(result[0].orderId, 1);
      chai.assert.equal(result[1].orderId, 3);
      chai.assert.equal(result[2].orderId, 2);
      chai.assert.equal(result[3].orderId, 4);
      chai.assert.equal(result[4].orderId, 5);
    });
  });

  describe('getOrderTotalQuantity', () => {
    let sandBox = sinon.sandbox.create();
    let orderObj = enhanceOrders([
      {
        orderId: 5,
        orderTime: '2021-01-20 11:00',
        items: [{ quantity: 1 }, { quantity: 2 }]
      }
    ]);

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('Should evalute the total quantity of items of an order', () => {
      chai.assert.equal(getOrderTotalQuantity(orderObj.first()), 3, 'Wrong order quantity');
    });
  });

  describe('getOrderTotalPrice', () => {
    let sandBox = sinon.sandbox.create();
    let orderObj = enhanceOrders([
      {
        orderId: 5,
        orderTime: '2021-01-20 11:00',
        items: [{ quantity: 1, unitPrice: 0.2}, { quantity: 2, unitPrice: 0.3 }]
      }
    ]);

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('Should evalute the total price of items of an order', () => {
      chai.assert.equal(getOrderTotalPrice(orderObj.first()), 0.8, 'Wrong total price');
    });
  });

  describe('getDeliveryPrice', () => {
    let sandBox = sinon.sandbox.create();
    let orderObj = enhanceOrders([
      {
        orderId: 5,
        orderTime: '2021-01-20 11:00',
        type: 'takeaway',
        items: [{ quantity: 1, unitPrice: 0.2}, { quantity: 2, unitPrice: 0.3 }],
        distance: '1.6 km'
      },
      {
        orderId: 6,
        orderTime: '2021-01-20 11:00',
        type: 'pickup_in_store',
        items: [{ quantity: 1, unitPrice: 0.2}, { quantity: 2, unitPrice: 0.3 }]
      }
    ]);

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('Should evalute the delivery price of an order', () => {
      chai.assert.equal(getDeliveryPrice(orderObj.first()), 1.6, 'Wrong delivery price');
      chai.assert.equal(getDeliveryPrice(orderObj.get(1)), 0, 'Wrong delivery price');
    });
  });
});
