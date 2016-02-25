/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.colHeader
 *
 **********************************************************/

angular.module('ng.cx.grid.example.overview.colHeader',[])

.directive('overviewColumnHeaderRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/overview/colHeader/colHeader.html',
        };
    }
])

/**********************************************************/
;
