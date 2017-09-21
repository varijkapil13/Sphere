'use strict';

describe('Directive: text/enterpressed', function () {

  // load the directive's module
  beforeEach(module('sphereApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<text/enterpressed></text/enterpressed>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the text/enterpressed directive');
  }));
});
