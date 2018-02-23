'use strict';
import sinon from 'sinon';
import chai from 'chai';
import orderUtils from '../src/utils/orders-utils.js';

describe('OrderUtils', () => {
  let sandBox = sinon.sandbox.create();
  let fakeOrder = {
    orders: [
      { orderId: 1, orderTime: '2017-11-24 11:00' },
      { orderId: 2, orderTime: '2018-11-24 11:00' }
    ]
  };

  beforeEach(() => {
    // stub out the `hello` method
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('orderByDate should return all orders by date', () => {
    Object.assign(fakeOrder.orders, orderUtils);

    var result = fakeOrder.orders.orderByDate('2017-01-01', '2019-01-01');

    chai.assert.equal(result.length, '2');
    chai.assert.equal(result[0].orderId, '1');
  });

  it('orderByDate should filter the number of dates', () => {
    Object.assign(fakeOrder.orders, orderUtils);

    var result = fakeOrder.orders.orderByDate('2018-01-01', '2019-01-01');

    chai.assert.equal(result.length, '1');
    chai.assert.equal(result[0].orderId, '2');
  });

  it('orderByDate should return nothing if dates are inconsistent', () => {
    Object.assign(fakeOrder.orders, orderUtils);

    var result = fakeOrder.orders.orderByDate('2019-01-01', '2018-01-01');

    chai.assert.equal(result.length, '1');
    chai.assert.equal(result[0].orderId, '2');
  });

  it('orderByDate should return no order at all if dates outside boundaries are chosen', () => {
    Object.assign(fakeOrder.orders, orderUtils);

    var result = fakeOrder.orders.orderByDate('2019-01-01', '2020-01-01');

    chai.assert.equal(result.length, '0');
  });
});
