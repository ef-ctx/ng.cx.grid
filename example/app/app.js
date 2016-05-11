/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.
 *
 **********************************************************/

angular.module('ng.cx.grid.example',[
    'ng.cx.grid',
    'ng.cx.grid.example.components',
])

.controller('exampleController', [
    '$scope',
    function($scope) {
        'use strict';

        var _columnHeaders = [], _rowHeaders = [], _matrix = [];

        _init();

        $scope.test = 'test';
        $scope.matrix = _matrix;
        $scope.rowHeaders = _rowHeaders;
        $scope.columnHeaders = _columnHeaders;

        function _init() {
            _initializeMatrix();
        }

        function _initializeMatrix() {
            var width = 30,
                height = 4;

            for (var row = 0; row < height; row++) {
                _rowHeaders.push(rowHeaderParser(row, col, height));
                _matrix.push([]);
                for (var col = 0; col < width; col++) {
                    if(row===0) {
                        _columnHeaders.push(colHeaderParser(row, col, width));
                    }
                    _matrix[row].push(itemParser(row, col));
                }
            }
        }

        function itemParser (row, col) {
            return {
                title: 'Closed answer',
                label: row + '-' + col,
                score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
            };
        }

        function colHeaderParser(row, col, total) {
            return {
                title: 'Activity title that rolls over two lines, fixed to top ...',
                count: col + 1,
                total: total,
                score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
            };
        }

        function rowHeaderParser(row, col, total) {
            return {
                label: 'Student ' + row,
                count: col + 1,
                total: total,
                score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
            };
        }
    }
])

/**********************************************************/
;
