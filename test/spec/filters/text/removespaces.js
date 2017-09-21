'use strict';

describe('Filter: text/removespaces', function () {

  // load the filter's module
  beforeEach(module('sphereApp'));

  // initialize a new instance of the filter before each test
  var text/removespaces;
  beforeEach(inject(function ($filter) {
    text/removespaces = $filter('text/removespaces');
  }));

  it('should return the input prefixed with "text/removespaces filter:"', function () {
    var text = 'angularjs';
    expect(text/removespaces(text)).toBe('text/removespaces filter: ' + text);
  });

});
