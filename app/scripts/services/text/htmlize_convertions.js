'use strict';

/**
 * @ngdoc service
 * @name sphereApp.HTMLIZECONVERTIONS
 * @description
 * # sphere/text/HTMLIZECONVERTIONS
 * Value in the sphereApp.
 */
angular.module('sphereApp')
  .value('HTMLIZECONVERTIONS', [
  	{ expr: /\n+?/g, value: '<br>' }
	]);
