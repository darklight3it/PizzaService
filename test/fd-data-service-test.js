'use strict';
import sinon from 'sinon';
import chai from 'chai';
import dataService from '../src/services/fs-data-service.js';

describe('getJSON', () => {
  var sandBox = sinon.sandbox.create();
  var readFileSpy;

  beforeEach(() => {
    // stub out the `hello` method
    readFileSpy = sandBox.stub(dataService.deps, 'readFile')
  });

  afterEach(() => {
    sandBox.restore();
  });

  it('should retrieve a file from provided url', (done) => {
    readFileSpy.returns(Promise.resolve('{}'));
  
    dataService.getJSON('path')
      .then((data) => {
        sinon.assert.calledWith(readFileSpy, 'path');
      }).then(done, done);
  });

  it('should reject when the url is empty', (done) => {
    readFileSpy.returns(Promise.resolve('{}'));

    dataService.getJSON('')
      .catch(() => {
        chai.assert.ok();
      }).then(done, done);
  });
});
