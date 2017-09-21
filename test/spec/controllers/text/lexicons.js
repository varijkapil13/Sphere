'use strict';

describe('Controller: TextLexiconsCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var TextLexiconsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TextLexiconsCtrl = $controller('TextLexiconsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TextLexiconsCtrl.awesomeThings.length).toBe(3);
  });
});
