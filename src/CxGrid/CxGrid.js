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

        function CxGrid(gridData, columnHeaderData, rowHeaderData) {
            var _rowHeaders = [],
                _colHeaders = [],
                _cells = [
                    []
                ];

            Object.defineProperty(this, 'cells', {
                get: getCells
            });
            Object.defineProperty(this, 'rowHeaders', {
                get: getRowHeaders
            });
            Object.defineProperty(this, 'columnHeaders', {
                get: getColHeaders
            });

            _init();

            function _init() {
                _cells = gridData.map(function(row) {
                    return row.map(_createCell);
                });

                _rowHeaders = rowHeaderData.map(_createCell);
                _colHeaders = columnHeaderData.map(_createCell);

                $timeout(function() {
                    console.log('ready', _cells[_rowHeaders.length -1][_colHeaders.length -1].width);
                });

            }

            function _createCell(data) {
                return new CxCell(data);
            }

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

        function CxCell(data) {
            var _data = data,
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

            function getData() {
                return _data;
            }

            function get$element() {
                return _$element;
            }

            function set$element($element) {
                _$element = $element;
                _$element.rect = $element[0].getBoundingClientRect();
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

        return CxGrid;
    }
])


/**********************************************************/
;
