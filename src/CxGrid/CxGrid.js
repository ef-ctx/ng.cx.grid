/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.CxGrid
 *
 **********************************************************/

angular.module('ng.cx.grid.CxGrid', [
    'ng.cx.grid.CxCell',
    'ng.cx.grid.cell.renderer'
])

/**********************************************************
 *
 * @ngdoc service
 * @name CxGrid
 *
 * with ng-repeat it takes 6626.162ms to render
 **********************************************************/

.factory('CxGrid', [
    '$timeout',
    'CxCell',
    function $CxGrid($timeout, CxCell) {
        'use strict';

        return CxGrid;

        function CxGrid(
            gridData,
            columnHeaderData,
            rowHeaderData,
            cellRenderer,
            columnHeaderRenderer,
            rowHeaderRenderer,
            cornerRenderer,
            $mainContainer,
            $colHeadersContainer,
            $rowHeadersContainer,
            $cellsContainer,
            $cornerContainer
        ) {

            console.time('render');

            var _onRenderHandlers = [],
                _rowHeaders = [],
                _colHeaders = [],
                _cells = [
                    []
                ];

            this.onRender = onRender;

            _init();

            function onRender(handler) {
                _onRenderHandlers.push(handler);
            }

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
                console.timeEnd('render');
            }

            function _renderHeaders() {
                _colHeaders = columnHeaderData.map(_createColHeaderCell);
                _rowHeaders = rowHeaderData.map(_createRowHeaderCell);
            }

            function _renderCorner() {
                var width = _getMaxMeasure(_rowHeaders, 'width'),
                    height = _getMaxMeasure(_colHeaders, 'height');

                $cornerContainer.css('min-width', width + 'px');
                $cornerContainer.css('min-height', height + 'px');
            }

            function _getMaxMeasure(elements, measure) {
                var measures = elements.map(function(cell) {
                    return cell[measure];
                });

                return Math.max.apply(null, measures);
            }

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


            function _createRowHeaderCell(data) {
                var cell = _createCell(data, rowHeaderRenderer);
                $rowHeadersContainer.append(cell.$element);
                return cell;
            }

            function _createGridCell(rowIndex, colIndex) {
                console.log(rowIndex, colIndex);

                var cell,
                    data = gridData[rowIndex][colIndex],
                    colHeaderCell = _colHeaders[colIndex],
                    rowHeaderCell = _rowHeaders[rowIndex],
                    restrictions = {
                        measure: {
                            width: colHeaderCell.width,
                            height: rowHeaderCell.height
                        },
                        position: {
                            x: colHeaderCell.left,
                            y: rowHeaderCell.top
                        }
                    };

                cell = _createCell(data, cellRenderer, restrictions);

                $cellsContainer.append(cell.$element);

                return cell;
            }

            function _createColHeaderCell(data) {
                var cell = _createCell(data, columnHeaderRenderer);
                $colHeadersContainer.append(cell.$element);
                return cell;
            }

            function _createCell(data, template, restrictions) {
                return new CxCell(data, template, restrictions);
            }

            /**********************************************************
             * GETTERS & SETTERS
             **********************************************************/

            function getCells() {
                return _cells;
            }

            function getRowHeaders() {
                return _rowHeaders;
            }

            function getColHeaders() {
                return _colHeaders;
            }
        }

    }
])


/**********************************************************/
;
