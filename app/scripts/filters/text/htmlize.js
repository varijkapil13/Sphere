'use strict';

/**
 * @ngdoc filter
 * @name sphereApp.filter:htmlize
 * @function
 * @description
 * # sphere/text/htmlize
 * Filter in the sphereApp.
 */
angular.module('sphereApp')
	.filter('htmlize', function (HTMLIZECONVERTIONS) {
		return function (string) {
			return HTMLIZECONVERTIONS.reduce(function (result, conversion) {
				return result.replace(conversion.expr, conversion.value);
			}, string || '');
		};
	});
