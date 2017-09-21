'use strict';

describe('Controller: ImagePredictionsCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var ImagePredictionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImagePredictionsCtrl = $controller('ImagePredictionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImagePredictionsCtrl.awesomeThings.length).toBe(3);
  });
});
