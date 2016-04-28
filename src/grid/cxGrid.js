angular.module('ng.cx.grid.grid', [
    'ng.cx.grid.cxScroll',
    'ng.cx.grid.CxGrid'
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
            templateUrl: 'src/grid/ng.cx.grid.html',
            controller: 'cxGridController as gridController',
            scope: {},
            bindToController: {
                ioDataProvider: '=?',
                ioRowHeaderDataProvider: '=?',
                ioColumnHeaderDataProvider: '=?',
                ioCellRenderer: '@?',
                ioRowHeaderRenderer: '@?',
                ioColumnHeaderRenderer: '@?',
                ioCornerRenderer: '@?'
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

.service('cxGridService',[
    function cxGridService() {
        'use strict';

        var _currentGrid;

        this.addGrid = addGrid;
        this.cleanCurrentGrid = cleanCurrentGrid;
        this.highlightRow = highlightRow;
        this.highlightColumn = highlightColumn;

        function addGrid(grid) {
            _currentGrid = grid;
        }

        function cleanCurrentGrid() {
            _currentGrid = undefined;
        }

        function highlightRow(index) {
            _currentGrid.highlightRow(index);
        }

        function highlightColumn(index) {
            _currentGrid.highlightColumn(index);
        }
    }
])

.controller('cxGridController', [
    '$scope',
    '$timeout',
    '$element',
    'CxGrid',
    'cxGridService',
    function ngCxGridController($scope, $timeout, $element, CxGrid, cxGridService) {
        'use strict';

        var _grid,
            _$rowHeadersContainer,
            _$colHeadersContainer,
            _$cellsContainer,
            _$cornerContainer;

        _$rowHeadersContainer = get$elementBySelector('.cx-grid-rh-container');
        _$colHeadersContainer = get$elementBySelector('.cx-grid-ch-container');
        _$cellsContainer      = get$elementBySelector('.cx-grid-cells-container');
        _$cornerContainer     = get$elementBySelector('.cx-grid-corner-container');

        _grid = new CxGrid(
            this.ioDataProvider,
            this.ioColumnHeaderDataProvider,
            this.ioRowHeaderDataProvider,
            this.ioCellRenderer,
            this.ioColumnHeaderRenderer,
            this.ioRowHeaderRenderer,
            this.ioCornerRenderer,
            $element,
            _$colHeadersContainer,
            _$rowHeadersContainer,
            _$cellsContainer,
            _$cornerContainer
        );

        cxGridService.addGrid( _grid );

        function get$elementBySelector(selector) {
            return angular.element($element[0].querySelector(selector));
        }
    }
])

/**********************************************************/
;
