'use strict';

describe('Service: image/sphereImagesConfig', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var image/sphereImagesConfig;
  beforeEach(inject(function (_image/sphereImagesConfig_) {
    image/sphereImagesConfig = _image/sphereImagesConfig_;
  }));

  it('should do something', function () {
    expect(!!image/sphereImagesConfig).toBe(true);
  });

});
