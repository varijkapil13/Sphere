'use strict';

/**
 * @ngdoc filter
 * @name sphereApp.filter:sphere/text/removeSpaces
 * @function
 * @description
 * # sphere/text/removeSpaces
 * Filter in the sphereApp.
 */
angular.module('sphereApp')
  .filter('removeSpaces', function () {
    return function (string) {
      if (!angular.isString(string)){
      	return string;
			}
			return string.replace(/[\s]/g,'');
    };
  });
