'use strict';

describe('Service: text/workflowcreation', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var text/workflowcreation;
  beforeEach(inject(function (_text/workflowcreation_) {
    text/workflowcreation = _text/workflowcreation_;
  }));

  it('should do something', function () {
    expect(!!text/workflowcreation).toBe(true);
  });

});
