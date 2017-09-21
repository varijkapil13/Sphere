/**
 * @ngdoc directive
 * @name sphereApp.directive:visualizationDirective
 * @description
 * # visualizationDirective
 */

'use strict';
angular.module('sphereApp')
	.directive('modalDiv', function () {
		return {
			restrict: 'E',
			scope: {
				show: '=',
				setFn: '&'
			},
			replace: true, // Replace with the template below
			transclude: true, // we want to insert custom content inside the directive
			link: function (scope, element, attrs) {
				scope.dialogStyle = {};
				if (attrs.width)
					scope.width = attrs.width;
				if (attrs.height)
					scope.height = attrs.height;
				scope.hideModal = function () {
					scope.show = false;
				};
				scope.setFn({
					theDirFn: scope.hideModal
				})
			},
			template: "<div class='ng-modal' ng-show='show'>" +
			"<div class='ng-modal-overlay'></div>" +
			"<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
			"<div class='modal-header'><h3 class='modal-title' id='modal-title'>Select an option</h3></div>" +
			"<div class='ng-modal-dialog-content modal-body' id='modal-body' ng-transclude></div>" +
			"</div>" +
			"</div>"
		};
	});
