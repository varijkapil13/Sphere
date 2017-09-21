'use strict';

describe('Service: image/sphereImagesService', function () {

  // load the service's module
  beforeEach(module('sphereApp'));

  // instantiate service
  var image/sphereImagesService;
  beforeEach(inject(function (_image/sphereImagesService_) {
    image/sphereImagesService = _image/sphereImagesService_;
  }));

  it('should do something', function () {
    expect(!!image/sphereImagesService).toBe(true);
  });

});
