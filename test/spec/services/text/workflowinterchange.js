'use strict';

describe('Service: text/workflowinterchange', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var text/workflowinterchange;
  beforeEach(inject(function (_text/workflowinterchange_) {
    text/workflowinterchange = _text/workflowinterchange_;
  }));

  it('should do something', function () {
    expect(!!text/workflowinterchange).toBe(true);
  });

});
