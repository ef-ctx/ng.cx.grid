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
                _cells = [[]];

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

                if (Array.isArray(matrix) && Array.isArray(matrix[0])) {
                    _cells = matrix;
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

            function getCellAt(row, col) {

                return _cells[row][col];
            }

            function getColAt(index) {
                var col = [];

                for (var row = 0; row < _self.height; row++) {
                    col.push(_cells[row][index]);
                }

                return col;

            }

            function getRowAt(index) {

                return _cells[index];
            }

            function addColAt(index, cells) {
                for (var row = 0; row < _self.height; row++) {
                    _cells[row].splice(index, 0, cells[row]);
                }
                _width++;
            }

            function addRowAt(index, cells) {

                _cells.splice(index, 0, cells);
                _height++;
            }

            function getCopy() {
                return new CxMatrix(_cells);
            }

            function map(callback) {

                var cells = _cells.map(function(row, rowIndex) {
                    return row.map(function(item, colIndex) {

                        return callback.call(this, item, rowIndex, colIndex, _self);
                    });
                });

                return new CxMatrix(cells);
            }


            /**********************************************************
             * HELPERS
             **********************************************************/

            function _setInitialDimensions() {
                _width = _cells[0].length;
                _height = _cells.length;
            }

        }
    }
]);
