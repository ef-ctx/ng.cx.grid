angular.module('ng.cx.grid.grid', [
    'ng.cx.grid.service'
])

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
    '$timeout',
    'gridService',
    'CxGrid',
    function ngCxGridController($scope, $timeout, gridService, CxGrid) {
        'use strict';
        console.log('ioDataProvider', this.ioDataProvider);

        var _grid = new CxGrid(
            this.ioDataProvider,
            this.ioColumnHeaderDataProvider,
            this.ioRowHeaderDataProvider);

        $scope.gridData = _grid.cells;
        $scope.rowHeaderData = _grid.rowHeaders;
        $scope.columnHeaderData = _grid.columnHeaders;
    }
])

/**********************************************************/

;
