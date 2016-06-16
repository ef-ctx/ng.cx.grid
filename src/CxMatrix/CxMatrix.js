angular.module('ng.cx.grid.CxMatrix', [])

/**********************************************************
 *
 * @ngdoc component
 * @name myComponent
 *
 **********************************************************/

.factory('CxMatrix', [
    function $cxMatrixFactory() {
        'use strict';


        return CxMatrix;

        /**
         * PRECONDITIONS:
         * 1.) if initialised with a matrix all rows and columns has to have the same length
         **/

        function CxMatrix(matrix) {

            var _self = this,
                _height = 0,
                _width = 0,
                _cells = [];

            /**********************************************************
             * PROPERTIES
             **********************************************************/

            Object.defineProperty(this, 'height', {
                get: getHeight
            });

            Object.defineProperty(this, 'width', {
                get: getWidth
            });

            /**********************************************************
             * METHODS
             **********************************************************/

            this.getCellAt = getCellAt;

            this.getColAt = getColAt;
            this.getRowAt = getRowAt;

            this.addRowAt = addRowAt;
            this.addColAt = addColAt;

            this.getCopy = getCopy;
            this.map = map;

            /**********************************************************
             * CONSTRUCTOR
             **********************************************************/

            _init();

            function _init() {

                if (Array.isArray(matrix)) {
                    _cells = matrix || _cells;
                    _setInitialDimensions();
                }
            }

            /**********************************************************
             * ACCESSORS
             **********************************************************/

            function getHeight() {
                return _height;
            }

            function getWidth() {
                return _width;
            }

            /**********************************************************
             * METHOD IMPLEMENTATION
             **********************************************************/

            function getCellAt(col, row) {

                return _cells[col][row];
            }

            function getColAt(index) {

                return _cells[index];
            }

            function getRowAt(index) {

                var row = [];

                for (var col = 0; col < _self.width; col++) {
                    row.push(_cells[col][index]);
                }

                return row;
            }

            function addColAt(index, cells) {
                _cells.splice(index, 0, cells);
                _width++;
            }

            function addRowAt(index, cells) {

                for (var col = 0; col < _self.width; col++) {
                    _cells[col].splice(index, 0, cells[col]);
                }

                _height++;
            }

            function getCopy() {
                return new CxMatrix(_cells);
            }

            function map(callback) {

                var cells = _cells.map(function(col, colIndex) {
                    return col.map(function(item, rowIndex) {

                        return callback.call(this, item, colIndex, rowIndex, _self);
                    });
                });

                return new CxMatrix(cells);
            }


            /**********************************************************
             * HELPERS
             **********************************************************/

            function _setInitialDimensions() {
                _width = _cells.length;
                _height = _cells[0].length;
            }

        }
    }
]);
