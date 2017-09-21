'use strict';

describe('Controller: TextWorkflowannotatorCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var TextWorkflowannotatorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TextWorkflowannotatorCtrl = $controller('TextWorkflowannotatorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TextWorkflowannotatorCtrl.awesomeThings.length).toBe(3);
  });
});
