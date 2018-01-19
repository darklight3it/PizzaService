'use strict';
import sinon from 'sinon';
import chai from 'chai';
import app from '../src/app.js';

describe('start', () => {
  let getJSONStub;
  let dataService = { getJSON: function (params) { } };
  let orderUtils = { orderByDate: function () { } };
  let sandBox = sinon.sandbox.create();
  let fakeOrder = {
    orders: [
      { 'orderId': 1, 'orderTime': '2017-11-24 11:00' }]
  };

  beforeEach(() => {
    // stub out the `hello` method
    getJSONStub = sandBox.stub(dataService, 'getJSON');

  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should get all the orders if date are not provided', (done) => {
    getJSONStub.returns(Promise.resolve(fakeOrder));
    let orderByDateSpy = sinon.spy(orderUtils, 'orderByDate');

    app.getOrders('path', dataService, orderUtils)
      .then(orders => {
        chai.assert.equal(1, orders.length);
        sinon.assert.notCalled(orderByDateSpy);
      })
      .then(done, done);
  });

  it('should order by date if dates are provided', (done) => {
    getJSONStub.returns(Promise.resolve(fakeOrder));
    let orderByDateSpy = sinon.spy(orderUtils, 'orderByDate');

    app.getOrders('path 2017-11-24 2017-11-25', dataService, orderUtils)
      .then(orders => {
        chai.assert.equal(1, orders.length);
        sinon.assert.calledOnce(orderByDateSpy);
      })
      .then(done, done);
  });
});
