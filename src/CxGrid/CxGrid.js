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

            var _rowHeaders = [],
                _colHeaders = [],
                _cells = [
                    []
                ],
                _highlighted = {
                    x: undefined,
                    y: undefined
                };


            this.highlightRow = highlightRow;
            this.highlightColumn = highlightColumn;
            this.addColumnAt = addColumnAt;
            this.addRowAt = addRowAt;

            /**********************************************************
             * IMPLEMENTATION
             **********************************************************/

            _init();

            /**********************************************************
             * METHODS
             **********************************************************/


            function highlightRow(index) {
                _toggleLineHighlighting(index, 'x');
            }

            function highlightColumn(index) {
                _toggleLineHighlighting(index, 'y');
            }

            function addColumnAt(index, header, cells) {
                _addHeaderAtIndex(index, header, columnHeaderRenderer, _colHeaders, $colHeadersContainer);
            }

            function addRowAt(index, header, cells) {
                _addHeaderAtIndex(index, header, rowHeaderRenderer, _rowHeaders, $rowHeadersContainer);
            }

            function _addHeaderAtIndex(index, data, renderer, collection, container) {
                var cell = _createCell(data, renderer, null, gridScope);

                collection.splice(index, 0, cell);

                if ( index > 0 ) {
                    collection[index - 1].$element.after(cell.$element);
                } else {
                    container.prepend(cell.$element);
                }
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
            }

            // HEADERS -------------------------------------------------

            function _renderHeaders() {
                _colHeaders = dataProvider.colHeaders.map(_createColHeaderCell);
                _rowHeaders = dataProvider.rowHeaders.map(_createRowHeaderCell);
            }

            function _createColHeaderCell(data) {
                var cell = _createCell(data, columnHeaderRenderer, null, gridScope);
                $colHeadersContainer.append(cell.$element);
                return cell;
            }

            function _createRowHeaderCell(data) {
                var cell = _createCell(data, rowHeaderRenderer, null, gridScope);

                $rowHeadersContainer.append(cell.$element);
                return cell;
            }

            // CORNER -------------------------------------------------

            function _renderCorner() {
                var restrictions = {
                        measure: {
                            width: _getMaxMeasure(_rowHeaders, 'width'),
                            height: _getMaxMeasure(_colHeaders, 'height'),
                        }
                    },
                    cell = _createCell(undefined, cornerRenderer, restrictions, gridScope);

                $cornerContainer.append(cell.$element);
            }

            // GRID -------------------------------------------------

            function _renderGrid() {
                var row,
                    col,
                    width = _colHeaders.length,
                    height = _rowHeaders.length,
                    restrictions;

                for (row = 0; row < height; row++) {
                    _cells[row] = [];
                    for (col = 0; col < width; col++) {
                        _cells[row][col] = _createGridCell(row, col);
                    }
                }
            }

            function _createGridCell(rowIndex, colIndex) {
                var cell,
                    data = dataProvider.cells[rowIndex][colIndex],
                    colHeaderCell = _colHeaders[colIndex],
                    rowHeaderCell = _rowHeaders[rowIndex],
                    restrictions = {
                        measure: {
                            width: colHeaderCell.width,
                            height: rowHeaderCell.height
                        },
                        position: {
                            x: colHeaderCell.relativeLeft,
                            y: rowHeaderCell.relativeTop
                        }
                    };

                cell = _createCell(data, cellRenderer, restrictions, gridScope);

                $cellsContainer.append(cell.$element);

                return cell;
            }

            // HIGHLIGHT -------------------------------------------

            function _toggleLineHighlighting(index, axis) {
                var oppositeAxis = (axis === 'x') ? 'y' : 'x';

                if (_highlighted[axis] && _highlighted[axis].index !== index) {

                    if(_highlighted.x !== undefined) {
                        _highlighted.x.unHighlight();
                    }

                    if(_highlighted.y !== undefined) {
                        _highlighted.y.unHighlight();
                    }
                }

                if(_highlighted[oppositeAxis]) {
                    _highlighted[oppositeAxis].unHighlight();
                    _highlighted[oppositeAxis] = undefined;
                }

                _highlighted[axis] = (axis === 'x') ? _getRowByIndex(index) : _getColumnByIndex(index);

                if(_highlighted[axis] !== undefined) {
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

        function _createCell(data, template, restrictions, gridScope) {
            return new CxCell(data, template, restrictions, gridScope);
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
