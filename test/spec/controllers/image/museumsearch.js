'use strict';

describe('Controller: ImageMuseumsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var ImageMuseumsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImageMuseumsearchCtrl = $controller('ImageMuseumsearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImageMuseumsearchCtrl.awesomeThings.length).toBe(3);
  });
});
