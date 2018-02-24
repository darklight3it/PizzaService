'use strict';
import sinon from 'sinon';
import chai from 'chai';
import enhanceOrders from '../src/utils/orders-utils.js';

describe('OrderUtils', () => {
  let sandBox = sinon.sandbox.create();
  let orderObj = enhanceOrders([
    { orderId: 2, orderTime: '2018-11-24 11:00' },
    { orderId: 1, orderTime: '2017-11-24 11:00' }
  ]);

  beforeEach(() => {
    // stub out the `hello` method
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('filterByDate should return all orders by date', () => {
    var result = orderObj.filterByDate('2017-01-01', '2019-01-01').toArray();

    chai.assert.equal(result.length, '2');
  });

  it('filterByDate should filter the number of dates', () => {
    var result = orderObj.filterByDate('2018-01-01', '2019-01-01').toArray();

    chai.assert.equal(result.length, '1');
  });

  it('filterByDate should include boundaries', () => {
    var result = orderObj
      .filterByDate('2017-11-24 11:00', '2018-11-24 11:00')
      .toArray();

    chai.assert.equal(result.length, '2');
  });

  it('filterByDate should return no order at all if dates outside boundaries are chosen', () => {
    var result = orderObj.filterByDate('2019-01-01', '2020-01-01').toArray();

    chai.assert.equal(result.length, '0');
  });
});
