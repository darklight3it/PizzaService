'use strict';
import sinon from 'sinon';
import chai from 'chai';
import dataService from '../src/services/fs-data-service.js';

describe('getJSON', () => {
  var sandBox = sinon.sandbox.create();
  var readFileStub;

  beforeEach(() => {
    // stub out the `hello` method
    readFileStub = sandBox.stub(dataService.deps, 'readFile');
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should retrieve a file from provided url', (done) => {
    readFileStub.returns(Promise.resolve('{"orderId":1}'));
  
    dataService.getJSON('path')
      .then((data) => {
        sinon.assert.calledWith(readFileStub, 'path');
        chai.assert.equal(data.orderId, 1);
      }).then(done, done);
  });

  it('should reject when the url is empty', (done) => {
    dataService.getJSON('')
      .catch(() => {
        chai.assert.ok(true);
      }).then(done, done);
  });
});
