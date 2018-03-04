import sinon from 'sinon';
import chai from 'chai';
import strategy from '../src/strategies/payment-strategy';

describe('Payment Strategy', () => {
  describe('execute', () => {
    let sandBox = sinon.sandbox.create();
    let fakeOrder = {
      orders: [
        {
          orderId: 1,
          deliveryTime: '2017-11-26 11:00',
          address: 'via lunga 1',
          type: 'takeaway',
          distance: '800 m',
          customer: 'Marco',
          items: [
            { name: 'pizza', type: 'dish', quantity: 2, unitPrice: 8 },
            { name: 'Coca Cola', type: 'beverage', quantity: 1, unitPrice: 2.5 }
          ]
        },
        {
          orderId: 2,
          deliveryTime: '2017-11-24 11:00',
          address: 'via lunga 2',
          type: 'takeaway',
          distance: '1.5 km',
          customer: 'Davide',
          items: [
            { name: 'pizza', type: 'dish', quantity: 2, unitPrice: 8 },
            { name: 'Coca Cola', type: 'beverage', quantity: 1, unitPrice: 2.5 }
          ]
        },
        {
          orderId: 3,
          deliveryTime: '2017-11-24 11:00',
          address: 'via lunga 3',
          type: 'pickup_in_store',
          distance: '800 m',
          customer: 'Giulio',
          items: [{ name: 'Coca Cola', type: 'beverage', quantity: 1, unitPrice: 2.5 }]
        }
      ]
    };

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('should get all all orders if date are not provded', () => {
      let argv = { path: 'path' };
      let result = strategy.execute(argv, fakeOrder);

      chai.assert.equal(result.length, 3);
      chai.assert.equal(result[0].customer, 'Davide');
      chai.assert.equal(result[1].customer, 'Giulio');
      chai.expect(result.orderId).to.be.undefined;
    });

    it('should get all orders an sort them by delivery date, showing DeliveryPrice, TotalPrice and TotalQuantity', () => {
      let argv = { path: 'path', from: '2017-11-24', to: '2017-11-25' };
      let result = strategy.execute(argv, fakeOrder);

      chai.assert.equal(result.length, 2);
      chai.assert.equal(result[0].customer, 'Davide');
      chai.assert.equal(result[0].address, 'via lunga 2');
      chai.assert.equal(result[0].totalQuantity, 3, 'Total Quantity Wrong');
      chai.assert.equal(result[0].totalPrice, 18.5, 'Total Price Wrong');
      chai.assert.equal(result[0].distance, '1.5 km', 'Distance Wrong');
      chai.assert.equal(result[0].deliveryPrice, 1.5, 'Distance Wrong');
      chai.assert.equal(result[1].customer, 'Giulio');
      chai.assert.equal(result[1].address, 'via lunga 3');
      chai.assert.equal(result[1].totalQuantity, 1, 'Total Quantity Wrong');
      chai.assert.equal(result[1].totalPrice, 2.5, 'Total Price Wrong');
      chai.assert.equal(result[1].distance, '800 m', 'Distance Wrong');
      chai.assert.equal(result[1].deliveryPrice, 0, 'Distance Wrong');

      chai.expect(result.orderId).to.be.undefined;
    });
  });
});
