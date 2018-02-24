'use strict';
import sinon from 'sinon';
import app from '../src/app.js';

describe('start', () => {
  let getJSONStub;
  let createStub;
  let executeStub;
  let dataService = { getJSON: () => {} };
  let ordersStrategyFactory = { create: () => {} };
  let strategy = { execute: () => {} };
  let sandBox = sinon.sandbox.create();
  let fakeOrder = {
    orders: [{ orderId: 1, orderTime: '2017-11-24 11:00' }]
  };

  beforeEach(() => {
    // stub out the `hello` method
    getJSONStub = sandBox.stub(dataService, 'getJSON');
    createStub = sandBox.stub(ordersStrategyFactory, 'create');
    executeStub = sandBox.stub(strategy, 'execute');
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should create a strategy and execute it get all the orders if date are not provided', done => {
    getJSONStub.returns(Promise.resolve(fakeOrder));
    createStub.returns(strategy);
    let argv = {};

    app
      .getOrders(argv, dataService, ordersStrategyFactory)
      .then(orders => {
        sinon.assert.called(getJSONStub);
        sinon.assert.called(createStub);
        sinon.assert.called(executeStub);
      })
      .then(done, done);
  });
});
