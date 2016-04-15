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

.controller('cxGridController', [
    '$scope',
    '$timeout',
    '$element',
    'CxGrid',
    function ngCxGridController($scope, $timeout, $element, CxGrid) {
        'use strict';

        var _grid,
            _$rowHeadersContainer,
            _$colHeadersContainer,
            _$cellsContainer,
            _$cornerContainer;

        _$rowHeadersContainer = get$elementBySelector('.row-headers');
        _$colHeadersContainer = get$elementBySelector('.column-headers');
        _$cellsContainer = get$elementBySelector('.grid');
        _$cornerContainer = get$elementBySelector('.corner');

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

        window.cxGrid = _grid;

        function get$elementBySelector(selector) {
            return angular.element($element[0].querySelector(selector));
        }
    }
])

/**********************************************************/
;
