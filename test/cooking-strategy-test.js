'use strict';
import sinon from 'sinon';
import chai from 'chai';
import strategy from '../src/strategies/cooking-strategy';

describe('Cooking Strategy', () => {
  describe('execute', () => {
    let sandBox = sinon.sandbox.create();
    let fakeOrder = { orders: [
      { orderId: 1, deliveryTime: '2017-11-26 11:00', customer: 'Marco', items: [{ name: 'pizza', type: 'dish', quantity: 1 }] }, 
      { orderId: 2, deliveryTime: '2017-11-24 11:00', customer: 'Davide', items: [{ name: 'patatine', type: 'dish', quantity: 1 }] }, 
      { orderId: 3, deliveryTime: '2017-11-24 11:00', customer: 'Giulio', items: [{ name: 'Coca Cola', type: 'beverage', quantity: 1 }] }] };

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('should get all the items of type dish by date if date are not provided', () => {
      let argv = { path: 'path' };
      let result = strategy.execute(argv, fakeOrder);

      chai.assert.equal(result.length, 2);
      chai.assert.equal(result[0].customer, 'Davide');
      
      chai.assert.equal(result[1].customer, 'Marco');
      chai.expect(result.orderId).to.be.undefined;
    });

    it('should get all items of type dish and order them by delivery date', () => {
      let argv = { path: 'path', from: '2017-11-24', to: '2017-11-25' };
      let result = strategy.execute(argv, fakeOrder);

      chai.assert.equal(result.length, 1);
      chai.assert.equal(result[0].customer, 'Davide');
      chai.assert.equal(result[0].name, 'patatine');
      chai.expect(result.orderId).to.be.undefined;
    });
  });
});
