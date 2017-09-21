'use strict';

describe('Controller: ImageValidationCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var ImageValidationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImageValidationCtrl = $controller('ImageValidationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImageValidationCtrl.awesomeThings.length).toBe(3);
  });
});
