'use strict';

describe('Filter: text/htmlize', function () {

  // load the filter's module
  beforeEach(module('sphereApp'));

  // initialize a new instance of the filter before each test
  var text/htmlize;
  beforeEach(inject(function ($filter) {
    text/htmlize = $filter('text/htmlize');
  }));

  it('should return the input prefixed with "text/htmlize filter:"', function () {
    var text = 'angularjs';
    expect(text/htmlize(text)).toBe('text/htmlize filter: ' + text);
  });

});
