/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.corner
 *
 **********************************************************/

angular.module('ng.cx.grid.example.overview.corner',[])

.directive('overviewCornerRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            templateUrl: 'example/app/components/overview/corner/corner.html',
        };
    }
])

/**********************************************************/
;
