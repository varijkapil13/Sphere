'use strict';

describe('Service: text/htmlizeConvertions', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var text/htmlizeConvertions;
  beforeEach(inject(function (_text/htmlizeConvertions_) {
    text/htmlizeConvertions = _text/htmlizeConvertions_;
  }));

  it('should do something', function () {
    expect(!!text/htmlizeConvertions).toBe(true);
  });

});
