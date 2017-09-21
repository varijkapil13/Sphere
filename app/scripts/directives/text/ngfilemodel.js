'use strict';

/**
 * @ngdoc directive
 * @name sphereApp.directive:sphere/text/ngFileModel
 * @description
 * # sphere/text/ngFileModel
 */
angular.module('sphereApp')
  .directive('ngFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            let model = $parse(attrs.ngFileModel);
            let isMultiple = attrs.multiple;
            let modelSetter = model.assign;
            element.bind('change', function () {
                let values = [];
                angular.forEach(element[0].files, function (item) {
                    let value = {
                       // File Name
                        name: item.name,
                        //File Size
                        size: item.size,
                        //File URL to view
                        url: URL.createObjectURL(item),
                        // File Input Value
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);
