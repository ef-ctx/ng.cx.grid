(function(angular) {
    'use strict';

    /**********************************************************
     *
     * @ngdoc module
     * @name ng.cx.grid.matrix
     *
     **********************************************************/

    angular
        .module('ng.cx.grid.CxMatrix', [])
        .factory('CxMatrix', [function $cxMatrixFactory() {
            return CxMatrix;
        }]);

    /**********************************************************
     *
     * @ngdoc module
     * @name ng.cx.grid.matrix
     *
     **********************************************************/

    function CxMatrix(colHeaders, rowHeaders, cells) {

        var _self = this,
            _colHeaders = colHeaders || [],
            _rowHeaders = rowHeaders || [],
            _cells = cells || [];

        Object.defineProperty(this, 'width', {
            get: getWidth
        });

        Object.defineProperty(this, 'height', {
            get: getHeight
        });

        this.getCellAt = getCellAt;
        this.getRowHeaderAt = getRowHeaderAt;
        this.getColHeaderAt = getColHeaderAt;

        this.getColAt = getColAt;
        this.getRowAt = getRowAt;

        this.addRowAt = addRowAt;
        this.addColAt = addColAt;

        function getCellAt(col, row) {
            return _cells[col][row];
        }

        function getRowHeaderAt(index) {
            return _rowHeaders[index];
        }

        function getColHeaderAt(index) {
            return _colHeaders[index];
        }

        function getColAt(index) {

            var col = [];
            col.push(_colHeaders[index]);

            return col.concat(_cells[index]);
        }

        function getRowAt(index) {

            var row = [];
            row.push(_rowHeaders[index]);

            for (var col = 0; col < _rowHeaders.length; col++) {
                row.push(_cells[col][index]);
            }

            return row;
        }

        function addRowAt(index, header, cells) {

            _rowHeaders.splice(index, 0, header);
            console.log('_rowHeaders', _rowHeaders);


            for (var col = 0; col < _self.width; col++) {
                console.log('col',col);
                console.log('cells[col]',cells[col]);

                _cells[col].splice(index, 0, cells[col]);
            }
        }

        function addColAt(index, header, cell) {
            _colHeaders.splice(index, 0, header);
            _cells.splice(index, 0, cells);
        }

        // ACCESSORS

        function getWidth() {
            return _colHeaders.length;
        }

        function getHeight() {
            return _rowHeaders.length;
        }

    }

}(angular));
