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
        this.addRowAt = addRowAt;
        this.addColumnAt = addColumnAt;

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

        function addRowAt(index, header, cells) {
            _currentGrid.addRowAt(index, header, cells);
        }

        function addColumnAt(index, header, cells) {
            _currentGrid.addColumnAt(index, header, cells);
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
            _$cornerContainer,
            _$element = $element;

        this.scrollHandler = scrollHandler;

        _$rowHeadersContainer = get$elementBySelector('.cx-grid-rh-container');
        _$colHeadersContainer = get$elementBySelector('.cx-grid-ch-container');
        _$cellsContainer      = get$elementBySelector('.cx-grid-cells-container');
        _$cornerContainer     = get$elementBySelector('.cx-grid-corner-container');

        _grid = new CxGrid(
            this.ioDataProvider,
            this.ioCellRenderer,
            this.ioColumnHeaderRenderer,
            this.ioRowHeaderRenderer,
            this.ioCornerRenderer,
            $element,
            _$colHeadersContainer,
            _$rowHeadersContainer,
            _$cellsContainer,
            _$cornerContainer,
            $scope
        );

        cxGridService.addGrid( _grid );

        function scrollHandler(event) {

            var scrollTop = event.target.scrollTop,
                scrollLeft = event.target.scrollLeft;

            if(scrollTop > 0){
                _$element.addClass('is-scrolling-y');
            } else {
                _$element.removeClass('is-scrolling-y');
            }

            if(scrollLeft > 0){
                _$element.addClass('is-scrolling-x');
            } else {
                _$element.removeClass('is-scrolling-x');
            }
        }

        function get$elementBySelector(selector) {
            return angular.element($element[0].querySelector(selector));
        }
    }
])

/**********************************************************/
;
