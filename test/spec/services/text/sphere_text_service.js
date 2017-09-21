'use strict';

describe('Service: text/sphereTextService', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var text/sphereTextService;
  beforeEach(inject(function (_text/sphereTextService_) {
    text/sphereTextService = _text/sphereTextService_;
  }));

  it('should do something', function () {
    expect(!!text/sphereTextService).toBe(true);
  });

});
