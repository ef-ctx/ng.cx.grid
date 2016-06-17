angular.module('ng.cx.grid.CxGridMatrix', [
    'ng.cx.grid.CxMatrix'
])

.factory('CxGridMatrix', [
    'CxMatrix',
    function $cxGridMatrixFactory(CxMatrix) {
        'use strict';

        return CxGridMatrix;

        /**********************************************************
         *
         * @ngdoc module
         * @name ng.cx.grid.matrix
         *
         **********************************************************/

        function CxGridMatrix(rowHeaders, colHeaders, cells) {

            var _self = this,
                _rowHeaders,
                _colHeaders,
                _cells,
                _handlers = {
                    onRowAdded: [],
                    onColAdded: []
                };

            /**********************************************************
             * PROPERTIES
             **********************************************************/

            Object.defineProperty(this, 'width', {
                get: getWidth
            });

            Object.defineProperty(this, 'height', {
                get: getHeight
            });

            Object.defineProperty(this, 'rowHeaders', {
                get: getRowHeaders
            });

            Object.defineProperty(this, 'colHeaders', {
                get: getColHeaders
            });

            Object.defineProperty(this, 'cells', {
                get: getCells
            });

            /**********************************************************
             * METHODS
             **********************************************************/

            this.getCellAt = getCellAt;
            this.getColHeaderAt = getColHeaderAt;
            this.getRowHeaderAt = getRowHeaderAt;

            this.getColAt = getColAt;
            this.getRowAt = getRowAt;

            this.getAxisByHeader = getAxisByHeader;

            this.addColAt = addColAt;
            this.addRowAt = addRowAt;

            this.getCopy = getCopy;

            this.map = map;
            this.mapColHeaders = mapColHeaders;
            this.mapRowHeaders = mapRowHeaders;
            this.mapCells = mapCells;

            //@TODO: this is a super simplistic approach,
            //this could be improved adding more event types
            //but for now this is the simplest and easier way.
            //
            //@TODO: add deregister methods
            this.onColAdded = onColAdded;
            this.onRowAdded = onRowAdded;

            /**********************************************************
             * CONSTRUCTOR
             **********************************************************/

            _init(rowHeaders, colHeaders, cells);

            function _init(rowHeaders, colHeaders, cells) {

                _rowHeaders = Array.isArray(rowHeaders) ? rowHeaders.concat() : [];
                _colHeaders = Array.isArray(colHeaders) ? colHeaders.concat() : [];

                _cells = (cells instanceof CxMatrix) ? cells.getCopy() : new CxMatrix(cells);
            }

            /**********************************************************
             * ACCESSORS
             **********************************************************/

            function getWidth() {
                return _cells.width;
            }

            function getHeight() {
                return _cells.height;
            }

            function getRowHeaders() {
                return _rowHeaders;
            }

            function getColHeaders() {
                return _colHeaders;
            }

            function getCells() {
                return _cells;
            }

            /**********************************************************
             * METHOD IMPLEMENTATION
             **********************************************************/

            function getCellAt(row, col) {

                return _cells.getCellAt(row, col);
            }

            function getColHeaderAt(index) {

                return _colHeaders[index];
            }

            function getRowHeaderAt(index) {

                return _rowHeaders[index];
            }

            function getRowAt(index) {

                return [_rowHeaders[index]].concat(_cells.getRowAt(index));
            }

            function getColAt(index) {

                return [_colHeaders[index]].concat(_cells.getColAt(index));
            }

            function getAxisByHeader(header) {
                var rowIndex = _rowHeaders.indexOf(header),
                    colIndex = _colHeaders.indexOf(header);

                if (rowIndex > -1) {
                    return getRowAt(rowIndex);
                }

                if (colIndex > -1) {
                    return getColAt(colIndex);
                }


                throw new Error('CxGridMatrix.getAxisByHeader error: the header provided is not present on any of the headers lists');
            }

            function addRowAt(index, header, cells) {

                _rowHeaders.splice(index, 0, header);
                _cells.addRowAt(index, cells);
                _notifyHandlers('onRowAdded', index, header, cells);
            }

            function addColAt(index, header, cells) {
                _colHeaders.splice(index, 0, header);
                _cells.addColAt(index, cells);
                _notifyHandlers('onColAdded', index, header, cells);
            }


            function getCopy() {
                return new CxGridMatrix(_rowHeaders, _colHeaders, _cells);
            }

            function map(mapRowHeaderFn, mapColHeaderFn, mapCellsFn) {

                var rowHeaders = (typeof mapRowHeaderFn === 'function') ? mapRowHeaders(mapRowHeaderFn) : _rowHeaders,
                    colHeaders = (typeof mapColHeaderFn === 'function') ? mapColHeaders(mapColHeaderFn) : _colHeaders,
                    cells = (typeof mapCellsFn === 'function') ? mapCells(mapCellsFn) : _cells;

                return new CxGridMatrix(rowHeaders, colHeaders, cells);
            }

            function mapRowHeaders(mapFn) {
                return _rowHeaders.map(mapFn);
            }

            function mapColHeaders(mapFn) {
                return _colHeaders.map(mapFn);
            }

            function mapCells(mapFn) {
                return _cells.map(mapFn);
            }

            function onRowAdded(handler) {
                _handlers.onRowAdded.push(handler);
            }

            function onColAdded(handler) {
                _handlers.onColAdded.push(handler);
            }



            /**********************************************************
             * HELPERS
             **********************************************************/

            function _notifyHandlers(handlerId, index, header, cells) {
                _handlers[handlerId].map(function (handler) {
                    handler.call(this, index, header, cells);
                });
            }
        }
    }
]);
