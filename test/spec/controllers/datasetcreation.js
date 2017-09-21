'use strict';

describe('Controller: DatasetcreationCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var DatasetcreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatasetcreationCtrl = $controller('DatasetcreationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DatasetcreationCtrl.awesomeThings.length).toBe(3);
  });
});
