'use strict';
import sinon from 'sinon';
import chai from 'chai';
import factory from '../src/factories/orders-strategy-factory';

describe('Orders Strategy Factory', () => {
  describe('create', () => {
    let sandBox = sinon.sandbox.create();

    beforeEach(() => {
      // stub out the `hello` method
    });

    afterEach(() => {
      sandBox.restore();
    });

    it('should return default when nothing is passed', () => {
      
      let strategy = factory.create();

      chai.assert.equal(strategy.name, 'Default');

    });
 
    it('should return default when the dependency do not exist', () => {
      let strategy = factory.create('asdasdasd');

      chai.assert.equal(strategy.name, 'Default');
    });

    it('should return Cooking', () => {
      let strategy = factory.create('Cooking');

      chai.assert.equal(strategy.name, 'Cooking');
    });
  });
});
