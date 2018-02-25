'use strict';
import sinon from 'sinon';
import chai from 'chai';
import strategy from '../src/strategies/cooking-strategy';

describe('cooking strategy execute', () => {
  let sandBox = sinon.sandbox.create();
  let fakeOrder = {
    orders: [
      { orderId: 1, deliveryTime: '2017-11-26 11:00', customer: 'Marco', items: [{name: 'pizza', quantity: 1}] },
      { orderId: 2, deliveryTime: '2017-11-24 11:00', customer: 'Davide', items: [{name: 'patatine', quantity: 1}] }
    ]
  };

  beforeEach(() => {
    // stub out the `hello` method
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should get all the orders by date if date are not provided', () => {
    let argv = { path: 'path' };
    let result = strategy.execute(argv, fakeOrder);

    chai.assert.equal(result.length, 2);
    chai.assert.equal(result[0].customer, 'Davide');
    chai.assert.equal(result[1].customer, 'Marco');
    chai.expect(result.orderId).to.be.undefined; 
  });

  it('should order by delivery date if dates are provided', () => {
    let argv = { path: 'path', from: '2017-11-24', to: '2017-11-25' };
    let result = strategy.execute(argv, fakeOrder);

    chai.assert.equal(result.length, 1);
    chai.assert.equal(result[0].customer, 'Davide');
    chai.assert.equal(result[0].items[0].name, 'patatine');
    chai.expect(result.orderId).to.be.undefined;
    
  });
});
