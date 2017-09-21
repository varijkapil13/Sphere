'use strict';

describe('Service: text/workflowviewcreation', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var text/workflowviewcreation;
  beforeEach(inject(function (_text/workflowviewcreation_) {
    text/workflowviewcreation = _text/workflowviewcreation_;
  }));

  it('should do something', function () {
    expect(!!text/workflowviewcreation).toBe(true);
  });

});
