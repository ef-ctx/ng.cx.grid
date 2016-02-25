/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.colHeader
 *
 **********************************************************/

angular.module('ng.cx.grid.example.colHeader',[])

.directive('columnHeaderRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/detail/colHeader/colHeader.html',
        };
    }
])

/**********************************************************/
;
