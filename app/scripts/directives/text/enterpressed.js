'use strict';

/**
 * @ngdoc directive
 * @name sphereApp.directive:sphere/text/enterPressed
 * @description
 * # sphere/text/enterPressed
 */
angular.module('sphereApp')
	.directive('enterPressed', function ($parse) {
		return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('keydown keypress', function(event) {
                    if (event.which === 13) {
                        let attrValue = $parse(attrs.enterPressed);
                        (typeof attrValue === 'function') ? attrValue(scope) : angular.noop();
                        event.preventDefault();
                    }
                });
                scope.$on('$destroy', function() {
                    element.unbind('keydown keypress')
                })
            }
        };
	});
