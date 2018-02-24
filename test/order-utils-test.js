'use strict';
import sinon from 'sinon';
import chai from 'chai';
import enhanceOrders from '../src/utils/orders-utils.js';

describe('filterByDate', () => {
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
    var result = orderObj.filterByDate('2017-01-01', '2019-01-01').toArray();

    chai.assert.equal(result.length, 2);
  });

  it('should filter the number of dates', () => {
    var result = orderObj.filterByDate('2018-01-01', '2019-01-01').toArray();

    chai.assert.equal(result.length, 1);
  });

  it('should include boundaries', () => {
    var result = orderObj
      .filterByDate('2017-11-24 11:00', '2018-11-24 11:00')
      .toArray();

    chai.assert.equal(result.length, 2);
  });

  it('should return no order at all if dates outside boundaries are chosen', () => {
    var result = orderObj.filterByDate('2019-01-01', '2020-01-01').toArray();

    chai.assert.equal(result.length, 0);
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
