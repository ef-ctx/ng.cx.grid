/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.components
 *
 **********************************************************/

angular.module('ng.cx.grid.example.components',[
    'ng.cx.grid.example.components.gridDataForm'
])

.directive('corner', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/corner.html',
        };
    }
])

.directive('chTile', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/chTile.html',
            link: function($scope, $element, $attrs, controller) {

                $scope.isContracted = false;

                $scope.clickHandler = clickHandler;

                function clickHandler(evt) {
                    $scope.isContracted = !$scope.isContracted;
                }

            }
        };
    }
])

.directive('rhTile', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/rhTile.html',
        };
    }
])

.directive('tile', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/tile.html',
        };
    }
])

/**********************************************************/
;
