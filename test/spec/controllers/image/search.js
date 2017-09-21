'use strict';

describe('Controller: ImageSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var ImageSearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImageSearchCtrl = $controller('ImageSearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImageSearchCtrl.awesomeThings.length).toBe(3);
  });
});
