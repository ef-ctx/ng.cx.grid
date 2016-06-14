/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.cxGridService
 *
 **********************************************************/

angular.module('ng.cx.grid.cxGridService',[])

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
        this.addColAt = addColAt;

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

        function addColAt(index, header, cells) {
            _currentGrid.addColAt(index, header, cells);
        }
    }
])

/**********************************************************/
;
