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
        .factory('CxMatrix', [ function $cxMatrixFactory() { return CxMatrix; } ]);

    /**********************************************************
     *
     * @ngdoc module
     * @name ng.cx.grid.matrix
     *
     **********************************************************/

    function CxMatrix(colHeaders, rowHeaders, cells, factory) {

        //console.log(
            //'factory',
            //colHeaders,
            //rowHeaders,
            //cells,
            //factory);

        var _self       = this,
            _colHeaders = colHeaders || [],
            _rowHeaders = rowHeaders || [],
            _cells      = cells      || [];

        _init();

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

        this.getCellAt  = getCellAt;
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

            for(var col = 0; col < _rowHeaders.length; col++) {
                row.push(_cells[col][index]);
            }

            return row;
        }

        function addRowAt(index, header, cell){

        }

        function addColAt(index, header, cell){

        }

        function _init() {

            if(typeof constructor === 'function') {
                _colHeaders = colHeaders.map(factory.createInstance);
                _rowHeaders = rowHeaders.map(factory.createInstance);
                _cells = cells.map(function (col) {
                    return col.map(factory.createInstance);
                });
            }
        }

    }

}(angular));
