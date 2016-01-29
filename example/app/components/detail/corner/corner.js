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
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            templateUrl: 'example/app/components/detail/corner/corner.html',
        };
    }
])

/**********************************************************/
;
