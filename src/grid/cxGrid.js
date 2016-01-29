angular.module('ng.cx.grid.grid', [
    'ng.cx.grid.cxScroll',
    'ng.cx.grid.CxGrid',
    'ng.cx.grid.cell'
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

.controller('cxGridController', [
    '$scope',
    '$timeout',
    '$element',
    'CxGrid',
    function ngCxGridController($scope, $timeout, $element, CxGrid) {
        'use strict';

        var _$rowHeadersWp,
            _$colHeadersWp,
            _$corner,
            _grid;

        _grid = new CxGrid(
            this.ioDataProvider,
            this.ioColumnHeaderDataProvider,
            this.ioRowHeaderDataProvider);

        _$rowHeadersWp = get$elementBySelector('.row-headers');
        _$colHeadersWp = get$elementBySelector('.column-headers');
        _$corner = get$elementBySelector('.corner');

        $scope.grid = _grid;
        $scope.gridData = _grid.cells;
        $scope.rowHeaderData = _grid.rowHeaders;
        $scope.columnHeaderData = _grid.columnHeaders;

        _grid.onRender(_grindRendererdHandler);

        function _grindRendererdHandler() {
            _$rowHeadersWp.css('min-width', _grid.maxRowHeaderWidth + 'px');
            _$rowHeadersWp.css('max-width', _grid.maxRowHeaderWidth + 'px');
            _$colHeadersWp.css('min-height', _grid.maxColHeaderHeight + 'px');
            _$colHeadersWp.css('max-height', _grid.maxColHeaderHeight + 'px');

            _$corner.css('min-width', _grid.maxRowHeaderWidth + 'px');
            _$corner.css('max-width', _grid.maxRowHeaderWidth + 'px');
            _$corner.css('min-height', _grid.maxColHeaderHeight + 'px');
            _$corner.css('max-height', _grid.maxColHeaderHeight + 'px');
        }

        function get$elementBySelector(selector) {
            return angular.element($element[0].querySelector(selector));
        }
    }
])

/**********************************************************/

;
