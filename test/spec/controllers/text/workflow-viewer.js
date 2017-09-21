'use strict';

describe('Controller: TextWorkflowViewerCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var TextWorkflowViewerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TextWorkflowViewerCtrl = $controller('TextWorkflowViewerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TextWorkflowViewerCtrl.awesomeThings.length).toBe(3);
  });
});
