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

    function CxMatrix() {
        var self = this,
            _rowHeaders = [],
            _colHeaders = [],
            _cells = [
                []
            ];

        this.rowHeaders = _rowHeaders;
        this.colHeaders = _colHeaders;
        this.cells = _cells;

        Object.defineProperty(this, 'width', {
            get: function () {
                return self.colHeaders.length;
            }
        });

        Object.defineProperty(this, 'height', {
            get: function () {
                return self.rowHeaders.length;
            }
        });

    }

}(angular));
