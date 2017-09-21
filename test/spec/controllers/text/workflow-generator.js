'use strict';

describe('Controller: TextWorkflowGeneratorCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var TextWorkflowGeneratorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TextWorkflowGeneratorCtrl = $controller('TextWorkflowGeneratorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TextWorkflowGeneratorCtrl.awesomeThings.length).toBe(3);
  });
});
