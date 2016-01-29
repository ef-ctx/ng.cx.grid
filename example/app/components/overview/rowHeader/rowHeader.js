/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.rowHeader
 *
 **********************************************************/

angular.module('ng.cx.grid.example.overview.rowHeader',[])

.directive('overviewRowHeaderRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            templateUrl: 'example/app/components/overview/rowHeader/rowHeader.html',
        };
    }
])

/**********************************************************/
;
