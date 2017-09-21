'use strict';

describe('Controller: ImageTrainingCtrl', function () {

  // load the controller's module
  beforeEach(module('sphereApp'));

  var ImageTrainingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImageTrainingCtrl = $controller('ImageTrainingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImageTrainingCtrl.awesomeThings.length).toBe(3);
  });
});
