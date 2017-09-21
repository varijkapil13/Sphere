'use strict';

describe('Service: text/sphereTextConfig', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var text/sphereTextConfig;
  beforeEach(inject(function (_text/sphereTextConfig_) {
    text/sphereTextConfig = _text/sphereTextConfig_;
  }));

  it('should do something', function () {
    expect(!!text/sphereTextConfig).toBe(true);
  });

});
