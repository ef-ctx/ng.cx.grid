/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.CxGrid
 *
 **********************************************************/

angular.module('ng.cx.grid.CxGrid', [])

/**********************************************************
 *
 * @ngdoc service
 * @name CxGrid
 *
 **********************************************************/

.factory('CxGrid', [
    '$timeout',
    function $CxGrid($timeout) {
        'use strict';

        return CxGrid;

        function CxGrid(gridData, columnHeaderData, rowHeaderData) {
            var _onRenderHandlers = [],
                _rowHeaders = [],
                _colHeaders = [],
                _cells = [
                    []
                ],
                _maxColHeaderHeight = 0,
                _maxRowHeaderWidth = 0,
                _totalCellCount = 0,
                _totalCellRendered = 0,
                _onRenderComplete,
                _axes = {
                    x: [0],
                    y: [0]
                };

            Object.defineProperty(this, 'cells', {
                get: getCells
            });
            Object.defineProperty(this, 'rowHeaders', {
                get: getRowHeaders
            });
            Object.defineProperty(this, 'columnHeaders', {
                get: getColHeaders
            });
            Object.defineProperty(this, 'maxColHeaderHeight', {
                get: getMaxColHeaderHeight
            });
            Object.defineProperty(this, 'maxRowHeaderWidth', {
                get: getMaxRowHeaderWidth
            });
            Object.defineProperty(this, 'axes', {
                get: getAxes
            });

            this.onRender = onRender;

            _init();

            function onRender(handler) {
                _onRenderHandlers.push(handler);
            }

            function _init() {
                _renderHeaders();
            }

            function _renderHeaders() {
                _onRenderComplete = _onHeadersRenderComplete;
                _rowHeaders = rowHeaderData.map(_createCell);
                _colHeaders = columnHeaderData.map(_createCell);
            }

            function _onHeadersRenderComplete() {
                _onRenderComplete = _onGridRenderComplete;
                _calculateHeaderDimensions();
                _renderGrid();
            }

            function _renderGrid() {
                var restrictions;

                for (var row = 0; row < gridData.length; row++) {
                    _cells[row] = [];
                    for (var col = 0; col < gridData[row].length; col++) {
                        restrictions = {
                            width: _colHeaders[col].width,
                            height: _rowHeaders[row].height
                        };
                        _cells[row][col] = _createCell(gridData[row][col], restrictions);
                    }
                }
            }

            function _onGridRenderComplete() {
                _callOnRenderHandlers();
            }

            function _callOnRenderHandlers() {
                for (var ix = 0; ix < _onRenderHandlers.length; ix++) {
                    _onRenderHandlers[ix]();
                }
            }

            function _createCell(data, restrictions) {
                _totalCellCount++;
                return new CxCell(data, restrictions, _onCellRendered);
            }

            function _onCellRendered() {
                _totalCellRendered++;
                if (_totalCellCount === _totalCellRendered) {
                    _onRenderComplete();
                }
            }

            function _calculateHeaderDimensions() {
                var cxCell, ix;

                for (ix = 0; ix < _colHeaders.length; ix++) {
                    cxCell = _colHeaders[ix];
                    _maxColHeaderHeight = Math.max(_maxColHeaderHeight, cxCell.height);
                    _addAxisIntervalByCell(_axes.x,cxCell);
                }

                for (ix = 0; ix < _rowHeaders.length; ix++) {
                    cxCell = _rowHeaders[ix];
                    _maxRowHeaderWidth = Math.max(_maxRowHeaderWidth, cxCell.width);
                    _addAxisIntervalByCell(_axes.y,cxCell);
                }
            }

            function _addAxisIntervalByCell(axis, cxCell) {
                var intervalSize = (axis === _axes.x) ? cxCell.width : cxCell.height;
                axis.push(intervalSize + axis[axis.length - 1]);
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

            function getMaxColHeaderHeight() {
                return _maxColHeaderHeight;
            }

            function getMaxRowHeaderWidth() {
                return _maxRowHeaderWidth;
            }

            function getAxes() {
                return _axes;
            }
        }

        function CxCell(data, restrictions, onRenderHandler) {
            var _self = this,
                _data = data,
                _restrictions = restrictions,
                _$element;

            Object.defineProperty(this, 'data', {
                get: getData
            });
            Object.defineProperty(this, '$element', {
                get: get$element,
                set: set$element
            });
            Object.defineProperty(this, 'width', {
                get: getWidth
            });
            Object.defineProperty(this, 'height', {
                get: getHeight
            });
            Object.defineProperty(this, 'top', {
                get: getTop
            });
            Object.defineProperty(this, 'left', {
                get: getLeft
            });

            /**********************************************************
             * GETTERS & SETTERS
             **********************************************************/

            function getData() {
                return _data;
            }

            function get$element() {
                return _$element;
            }

            function set$element($element) {
                _$element = $element;
                if (_restrictions) {
                    _$element.css('width', restrictions.width + 'px');
                    _$element.css('height', restrictions.height + 'px');
                }
                _$element.rect = $element[0].getBoundingClientRect();

                if (angular.isFunction(onRenderHandler)) {
                    onRenderHandler(_self);
                }
            }

            function getWidth() {
                return _$element.rect.width;
            }

            function getHeight() {
                return _$element.rect.height;
            }

            function getTop() {
                return _$element.rect.top;
            }

            function getLeft() {
                return _$element.rect.left;
            }
        }
    }
])


/**********************************************************/
;
