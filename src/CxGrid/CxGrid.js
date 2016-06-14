/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.CxGrid
 *
 **********************************************************/

angular.module('ng.cx.grid.CxGrid', [
    'ng.cx.grid.CxCell'
])

/**********************************************************
 *
 * @ngdoc service
 * @name CxGrid
 *
 **********************************************************/

.factory('CxGrid', [
    '$timeout',
    'CxCell',
    function $CxGrid($timeout, CxCell) {
        'use strict';

        return CxGrid;

        function CxGrid(
            dataProvider,
            cellRenderer,
            columnHeaderRenderer,
            rowHeaderRenderer,
            cornerRenderer,
            $mainContainer,
            $colHeadersContainer,
            $rowHeadersContainer,
            $cellsContainer,
            $cornerContainer,
            gridScope
        ) {

            var self = this,
                _rowHeaders = [],
                _colHeaders = [],
                _cells = [
                    []
                ];

            Object.defineProperty(this, 'width', {
                get: function () {
                    return _colHeaders.length;
                }
            });

            Object.defineProperty(this, 'height', {
                get: function () {
                    return _rowHeaders.length;
                }
            });

            this.addColAt = addColAt;
            this.addRowAt = addRowAt;
            this.getCell = getCell;

            /**********************************************************
             * IMPLEMENTATION
             **********************************************************/

            _init();

            /**********************************************************
             * METHODS
             **********************************************************/

            function getCell(row, column) {
                return _cells[row][column];
            }

            function addColAt(index, header, cells) {
                _addHeaderAtIndex(index, header, columnHeaderRenderer, _colHeaders, $colHeadersContainer);
                $timeout(function () {
                    _addCellsColumnAt(index, cells, cellRenderer, $cellsContainer);
                });
            }

            function addRowAt(index, header, cells) {
                _addHeaderAtIndex(index, header, rowHeaderRenderer, _rowHeaders, $rowHeadersContainer);
                $timeout(function () {
                    _addCellsRowAt(index, cells, cellRenderer, $cellsContainer);
                });
            }

            function _addCellsRowAt(index, cells, template, $container) {
                var cell,
                    cellsRow = [];

                for (var ix = 0; ix < self.width; ix++) {
                    cell = _createCell(cells[ix], template, gridScope, _rowHeaders[index], _colHeaders[ix]);
                    cellsRow[ix] = cell;
                    cell.position();
                    $container.append(cell.$element);
                }

                _cells.splice(index, 0, cellsRow);
                $timeout(_repositionCells(index + 1, 0));
            }

            function _addCellsColumnAt(index, cells, template, $container) {
                var cell;

                for (var ix = 0; ix < self.height; ix++) {
                    cell = _createCell(cells[ix], template, gridScope, _rowHeaders[ix], _colHeaders[index]);
                    _cells[ix].splice(index, 0, cell);
                    cell.position();
                    $container.append(cell.$element);
                }

                $timeout(_repositionCells(0, index + 1));
            }

            function _repositionCells(initialRow, initialColumn) {
                initialRow = initialRow || 0;
                initialColumn = initialColumn || 0;

                for (var row = 0; row < self.height; row++) {
                    _rowHeaders[row].position();
                    for (var col = 0; col < self.width; col++) {
                        _colHeaders[col].position();
                        _cells[row][col].position();
                        _cells[row][col].resize();
                    }
                }
            }

            function headerClickedHandler(event, header) {
                console.log('event', event);
                console.log('header', header);
            }


            /**********************************************************
             * HELPERS
             **********************************************************/

            function _init() {
                _hideMainContainer();
                _renderHeaders();
                $timeout(_renderCorner);
                $timeout(_renderGrid);
                $timeout(_showMainContainer);
            }

            function _hideMainContainer() {
                $mainContainer.css('opacity', 0);
            }

            function _showMainContainer() {
                $mainContainer.css('opacity', 1);
                console.timeEnd('grid');
            }

            // HEADERS -------------------------------------------------

            function _renderHeaders() {

                dataProvider.colHeaders.map(_createColHeaderCell);
                dataProvider.rowHeaders.map(_createRowHeaderCell);
            }

            function _createColHeaderCell(data) {
                _addHeaderAtIndex(null, data, columnHeaderRenderer, _colHeaders, $colHeadersContainer);
            }

            function _createRowHeaderCell(data) {
                _addHeaderAtIndex(null, data, rowHeaderRenderer, _rowHeaders, $rowHeadersContainer);
            }

            function _addHeaderAtIndex(index, data, renderer, collection, container) {

                var cell = _createCell(data, renderer, gridScope, null, null, collection);

                index = angular.isNumber(index) ? index : collection.length;

                collection.splice(index, 0, cell);

                if (index === 0) {

                    container.prepend(cell.$element);

                } else if (index >= collection.length - 1) {

                    container.append(cell.$element);

                } else {

                    collection[index - 1].$element.after(cell.$element);
                    collection.map(function (item) {
                        item.position();
                    });
                }

                return cell;
            }

            // CORNER -------------------------------------------------

            function _renderCorner() {
                var width = _getMaxMeasure(_rowHeaders, 'width'),
                    height = _getMaxMeasure(_colHeaders, 'height'),
                    cell = _createCell(undefined, cornerRenderer, gridScope);

                cell.resize(width, height);
                $cornerContainer.append(cell.$element);
            }

            // GRID -------------------------------------------------

            function _renderGrid() {

                for (var row = 0; row < _rowHeaders.length; row++) {

                    _cells[row] = [];

                    for (var col = 0; col < _colHeaders.length; col++) {

                        _cells[row][col] = _createGridCell(row, col);
                    }
                }
            }

            function _createGridCell(rowIndex, colIndex) {

                var cellData = dataProvider.cells[rowIndex][colIndex],
                    cell = _createCell(
                    cellData,
                    cellRenderer,
                    gridScope,
                    _rowHeaders[rowIndex],
                    _colHeaders[colIndex]
                );

                $cellsContainer.append(cell.$element);

                return cell;
            }

        }

        function _createCell(data, template, gridScope, rowHeader, colHeader, collection) {
            return new CxCell(data, template, gridScope, rowHeader, colHeader, collection);
        }

        function _getMaxMeasure(elements, measure) {
            var measures = elements.map(function(cell) {
                return cell[measure];
            });

            return Math.max.apply(null, measures);
        }

    }
])


/**********************************************************/
;
