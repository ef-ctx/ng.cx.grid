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
            colHeaderRenderer,
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
                _cornerCell,
                _dataMatrix = dataProvider,
                _viewMatrix,
                _lastSelectedAxis = [];

            /**********************************************************
             * PROPERTIES
             **********************************************************/

            Object.defineProperty(this, 'width', {
                get: function() {
                    return _viewMatrix.width;
                }
            });

            Object.defineProperty(this, 'height', {
                get: function() {
                    return _viewMatrix.height;
                }
            });

            /**********************************************************
             * METHODS
             **********************************************************/


            /**********************************************************
             * CONSTRUCTOR
             **********************************************************/

            _init();

            function _init() {

                _hideMainContainer();

                _dataMatrix.onRowAdded(onRowAddedHandler);
                _dataMatrix.onColAdded(onColAddedHandler);

                _viewMatrix = _dataMatrix.map(_createRowHeader, _createColHeader, _createCell);

                _renderHeaders();
                _renderCorner();

                $timeout(function() {
                    _resizeCorner();
                    _renderAllCells();
                    _showMainContainer();
                });
            }

            /**********************************************************
             * ACCESSORS
             **********************************************************/

            /**********************************************************
             * METHOD IMPLEMENTATION
             **********************************************************/


            /**********************************************************
             * HANDLERS
             **********************************************************/

            function onColHeaderClicked(event, header) {
                _highlightAxis(_viewMatrix.getAxisByHeader(header));
            }

            function onRowHeaderClicked(event, header) {
                _highlightAxis(_viewMatrix.getAxisByHeader(header));
            }

            function onColAddedHandler(index, header, cells) {
                var headerCell = _createColHeader(header),
                    cxCells = cells.map(_createCell);

                _viewMatrix.addColAt(index, headerCell, cxCells);

                if (index === 0) {
                    $colHeadersContainer.prepend(headerCell.$element);
                } else {
                    _viewMatrix.getColHeaderAt(index - 1).$element.after(headerCell.$element);
                }

                $timeout(function() {
                    _viewMatrix.mapColHeaders(_resetCellPosition);
                    _viewMatrix.mapCells(_renderCell);
                    _resizeCorner();
                });


            }

            function onRowAddedHandler(index, header, cells) {
                var headerCell = _createRowHeader(header),
                    cxCells = cells.map(_createCell);

                _viewMatrix.addRowAt(index, headerCell, cxCells);

                if (index === 0) {
                    $rowHeadersContainer.prepend(headerCell.$element);
                } else {
                    _viewMatrix.getRowHeaderAt(index - 1).$element.after(headerCell.$element);
                }

                $timeout(function() {
                    _viewMatrix.mapRowHeaders(_resetCellPosition);
                    _viewMatrix.mapCells(_renderCell);
                    _resizeCorner();
                });
            }

            /**********************************************************
             * HELPERS
             **********************************************************/


            // Create -------------------------------------------------

            function _createColHeader(item, index) {
                var cell = _createCxCell(item, colHeaderRenderer, gridScope);
                cell.on('click', onColHeaderClicked);
                return cell;
            }

            function _createRowHeader(item, index) {
                var cell = _createCxCell(item, rowHeaderRenderer, gridScope);
                cell.on('click', onRowHeaderClicked);
                return cell;
            }

            function _createCell(item, col, row) {
                return _createCxCell(item, cellRenderer, gridScope);
            }





            // Render -------------------------------------------------

            function _renderColHeader(header, index) {
                $colHeadersContainer.append(header.$element);
            }

            function _renderRowHeader(header, index) {
                $rowHeadersContainer.append(header.$element);
            }

            function _renderCell(cell, rowIndex, colIndex) {

                if (cell) {
                    cell.positionByHeaders(
                        _viewMatrix.getRowHeaderAt(rowIndex),
                        _viewMatrix.getColHeaderAt(colIndex)
                    );

                    $cellsContainer.append(cell.$element);
                }
            }

            function _resetCellPosition(cell) {
                cell.position();
            }

            // Initial Render ----------------------------------------

            function _renderHeaders() {
                _viewMatrix.map(_renderRowHeader, _renderColHeader);
            }

            function _renderCorner() {
                _cornerCell = _createCxCell(undefined, cornerRenderer, gridScope);
                $cornerContainer.append(_cornerCell.$element);
            }

            function _resizeCorner() {

                var height = _getMaxMeasure(_viewMatrix.colHeaders, 'height'),
                    width = _getMaxMeasure(_viewMatrix.rowHeaders, 'width');

                _cornerCell.resize(width, height);
            }

            function _renderAllCells() {
                _viewMatrix.mapCells(_renderCell);
            }




            // Hide / Show --------------------------------------------

            function _hideMainContainer() {
                $mainContainer.css('opacity', 0);
            }

            function _showMainContainer() {
                $mainContainer.css('opacity', 1);
                console.timeEnd('grid');
            }

            // Highlight ----------------------------------------------

            function _highlightAxis(axis) {

                _lastSelectedAxis.map(deSelectCell);

                if (!isThePreviouslySelectedAxis(axis)) {
                    axis.map(selectCell);
                    _lastSelectedAxis = axis;
                }

                function selectCell(cell) {
                    if (cell) {
                        cell.select();
                    }
                }

                function deSelectCell(cell) {
                    if (cell) {
                        cell.deSelect();
                    }
                }

                function isThePreviouslySelectedAxis(axis) {
                    return _lastSelectedAxis[0] === axis[0];
                }
            }


        }

        function _createCxCell(data, template, gridScope) {
            return new CxCell(data, template, gridScope);
        }

        function _getMaxMeasure(elements, measure) {
            var measures = elements.map(function(cell, index) {
                return cell[measure];
            });

            return Math.max.apply(null, measures);
        }
    }
])


/**********************************************************/
;
