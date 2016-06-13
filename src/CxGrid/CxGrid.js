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
                ],
                _highlighted = {
                    x: undefined,
                    y: undefined
                };

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

            this.highlightRow = highlightRow;
            this.highlightColumn = highlightColumn;
            this.addColumnAt = addColumnAt;
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

            function highlightRow(index) {
                _toggleLineHighlighting(index, 'x');
            }

            function highlightColumn(index) {
                _toggleLineHighlighting(index, 'y');
            }

            function addColumnAt(index, header, cells) {
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

            function _addHeaderAtIndex(index, data, renderer, collection, container) {
                var cell = _createCell(data, renderer, gridScope, null);

                collection.splice(index, 0, cell);

                if (index > 0) {
                    collection[index - 1].$element.after(cell.$element);
                } else {
                    container.prepend(cell.$element);
                }

                collection.map(function (item) {
                    item.position();
                });
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
                _colHeaders = dataProvider.colHeaders.map(_createColHeaderCell);
                _rowHeaders = dataProvider.rowHeaders.map(_createRowHeaderCell);
            }

            function _createColHeaderCell(data) {
                var cell = _createCell(data, columnHeaderRenderer, gridScope, null);
                $colHeadersContainer.append(cell.$element);
                return cell;
            }

            function _createRowHeaderCell(data) {
                var cell = _createCell(data, rowHeaderRenderer, gridScope, null);

                $rowHeadersContainer.append(cell.$element);
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

            // HIGHLIGHT -------------------------------------------

            function _toggleLineHighlighting(index, axis) {
                var oppositeAxis = (axis === 'x') ? 'y' : 'x';

                if (_highlighted[axis] && _highlighted[axis].index !== index) {

                    if (_highlighted.x !== undefined) {
                        _highlighted.x.unHighlight();
                    }

                    if (_highlighted.y !== undefined) {
                        _highlighted.y.unHighlight();
                    }
                }

                if (_highlighted[oppositeAxis]) {
                    _highlighted[oppositeAxis].unHighlight();
                    _highlighted[oppositeAxis] = undefined;
                }

                _highlighted[axis] = (axis === 'x') ? _getRowByIndex(index) : _getColumnByIndex(index);

                if (_highlighted[axis] !== undefined) {
                    _highlighted[axis].toggleHighlight();
                }

            }

            function _getColumnByIndex(index) {
                var column = [_colHeaders[index]];

                for (var ix = 0; ix < _cells.length; ix++) {
                    column.push(_cells[ix][index]);
                }

                return new GridLine(index, column);
            }

            function _getRowByIndex(index) {
                return new GridLine(index, [_rowHeaders[index]].concat(_cells[index]));
            }
        }

        function _createCell(data, template, gridScope, rowHeader, colHeader) {
            return new CxCell(data, template, gridScope, rowHeader, colHeader);
        }

        function _getMaxMeasure(elements, measure) {
            var measures = elements.map(function(cell) {
                return cell[measure];
            });

            return Math.max.apply(null, measures);
        }

        function GridLine(index, elements) {
            var _self = this;

            Object.defineProperty(this, 'index', {
                get: function() {
                    return index;
                }
            });

            this.highlight = highlight;
            this.unHighlight = unHighlight;
            this.toggleHighlight = toggleHighlight;

            this.isEqual = isEqual;

            function toggleHighlight() {
                elements.map(function(element) {
                    element.toggleHighlight();
                });
            }

            function highlight() {
                elements.map(function(element) {
                    element.highlight();
                });
            }

            function unHighlight() {
                elements.map(function(element) {
                    element.unHighlight();
                });
            }

            function isEqual(gridLine) {
                return _self.index === gridLine.index;
            }
        }




    }
])


/**********************************************************/
;
