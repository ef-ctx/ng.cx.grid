/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.corner
 *
 **********************************************************/

angular.module('ng.cx.grid.example.corner',[])

.directive('cornerRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/detail/corner/corner.html',
        };
    }
])

/**********************************************************/
;
