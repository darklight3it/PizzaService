'use strict';
import sinon from 'sinon';
import chai from 'chai';
import app from '../src/app.js';

describe('start', () => {
  var getJSONStub;
  var dataService = {
    getJSON: function(params) {}
  };
  var sandBox = sinon.sandbox.create();

  beforeEach(() => {
    // stub out the `hello` method
    getJSONStub = sandBox.stub(dataService, 'getJSON');
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should retrieve all the orders if date are not provided', (done) => {
    getJSONStub.returns(Promise.resolve('{"orderId":1}'));

    app.start('path', dataService)
      .then((data) => {
        chai.AssertionError.ok();
      }).then(done, done);
  });
});
