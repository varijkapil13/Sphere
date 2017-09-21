'use strict';

describe('Controller: ApihubCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var ApihubCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApihubCtrl = $controller('ApihubCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ApihubCtrl.awesomeThings.length).toBe(3);
  });
});
