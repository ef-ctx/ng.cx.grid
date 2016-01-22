angular.module('ng.cx.grid.grid',[])

/**********************************************************
 *
 * @ngdoc directive
 * @name ngCxGrid
 * @module ng.cx.grid
 *
 **********************************************************/

.directive('cxGrid', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'src/grid/ng.cx.grid.tpl.html',
            controller: 'cxGridController as gridController',
            scope: {},
            bindToController: {
                ioDataProvider: '=?',
                ioRowHeaderDataProvider: '=?',
                ioColumnHeaderDataProvider: '=?',
                ioCellRenderer: '@?',
                ioRowHeaderRenderer: '@?',
                ioColumnHeaderRenderer: '@?',
            }
        };
    }
])

/**********************************************************
 *
 * @ngdoc controller
 * @name ngCxGridController
 * @module ng.cx.grid
 * @description  Description
 *
 **********************************************************/

.controller('cxGridController', [
    '$scope',
    function ngCxGridController($scope) {
        'use strict';
        console.log('ioDataProvider', this.ioDataProvider);
        $scope.gridData = this.ioDataProvider;
        $scope.rowHeaderData = this.ioRowHeaderDataProvider;
        $scope.columnHeaderData = this.ioColumnHeaderDataProvider;
    }
])

/**********************************************************/

;
