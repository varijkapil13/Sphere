'use strict';

describe('Filter: text/prettify', function () {

  // load the filter's module
  beforeEach(module('sphereApp'));

  // initialize a new instance of the filter before each test
  var text/prettify;
  beforeEach(inject(function ($filter) {
    text/prettify = $filter('text/prettify');
  }));

  it('should return the input prefixed with "text/prettify filter:"', function () {
    var text = 'angularjs';
    expect(text/prettify(text)).toBe('text/prettify filter: ' + text);
  });

});
