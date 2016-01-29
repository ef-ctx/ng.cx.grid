/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.rowHeader
 *
 **********************************************************/

angular.module('ng.cx.grid.example.rowHeader',[])

.directive('rowHeaderRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            templateUrl: 'example/app/components/detail/rowHeader/rowHeader.html',
        };
    }
])

/**********************************************************/
;
