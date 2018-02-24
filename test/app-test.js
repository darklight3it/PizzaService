'use strict';
import sinon from 'sinon';
import app from '../src/app.js';

describe('start', () => {
  let getJSONStub;
  let dataService = { getJSON: function(params) {} };
  let sandBox = sinon.sandbox.create();
  let fakeOrder = {
    orders: [{ orderId: 1, orderTime: '2017-11-24 11:00' }]
  };

  beforeEach(() => {
    // stub out the `hello` method
    getJSONStub = sandBox.stub(dataService, 'getJSON');
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should get all the orders if date are not provided', done => {
    getJSONStub.returns(Promise.resolve(fakeOrder));

    let enhancedObject = { toArray: () => {} };
    let mapStub = sandBox.stub().returns(enhancedObject);
    let filterByDateStub = sandBox.stub().returns(enhancedObject);
    let sortByStub = sandBox.stub().returns(enhancedObject);

    enhancedObject.filterByDate = filterByDateStub;
    enhancedObject.sortBy = sortByStub;
    enhancedObject.map = mapStub;

    let enhanceOrders = () => enhancedObject;

    app
      .getOrders({ path: 'path' }, dataService, enhanceOrders)
      .then(orders => {
        sinon.assert.notCalled(filterByDateStub);
        sinon.assert.notCalled(sortByStub);
      })
      .then(done, done);
  });

  it('should order by date if dates are provided', done => {
    getJSONStub.returns(Promise.resolve(fakeOrder));

    let enhancedObject = { toArray: () => {} };
    let mapStub = sandBox.stub().returns(enhancedObject);
    let filterByDateStub = sandBox.stub().returns(enhancedObject);
    let sortByStub = sandBox.stub().returns(enhancedObject);

    enhancedObject.filterByDate = filterByDateStub;
    enhancedObject.sortBy = sortByStub;
    enhancedObject.map = mapStub;

    let enhanceOrders = () => enhancedObject;

    app
      .getOrders(
        { path: 'path', from: '2017-11-24', to: '2017-11-25' },
        dataService,
        enhanceOrders
      )
      .then(orders => {
        //sinon.assert.calledWith(filterByDateStub, '2017-11-24', '2017-11-25');
        sinon.assert.called(filterByDateStub);
        sinon.assert.called(sortByStub);
      })
      .then(done, done);

    //filterByDateSpy.restore();
  });
});
