'use strict';

describe('Controller: TextDatasetcreationCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var TextDatasetcreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TextDatasetcreationCtrl = $controller('TextDatasetcreationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TextDatasetcreationCtrl.awesomeThings.length).toBe(3);
  });
});
