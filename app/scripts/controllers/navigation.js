'use strict';

/**
 * @ngdoc function
 * @name sphereApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the sphereApp
 */
angular.module('sphereApp')
	.controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {

		$scope.navCollapsed = true;

		$scope.isCurrentParent = function (parent) {
			return $location.path().indexOf(parent) === 0;
		};

		$scope.isCurrentPage = function (path) {
			return $location.path() === path;
		};
	}]);
