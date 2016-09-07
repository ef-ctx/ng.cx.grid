
angular.module('ng.cx.grid.example', [
    'ng.cx.grid',
    'ng.cx.grid.example.components',
    'ng.cx.grid.CxGridMatrix'
])

.controller('exampleController', [
    '$scope',
    'CxGridMatrix',
    function exampleController($scope, CxGridMatrix) {
        'use strict';

        var _matrix;

        Object.defineProperty(this, 'matrix', {
            get: function() {
                return _matrix;
            }
        });

        _init();

        function _init() {
            _matrix = buildGridData(20, 20);
        }


        function buildGridData(rows, cols) {

            var _rowHeaders = [],
                _colHeaders = [],
                _cells = [];

            for (var row = 0; row < rows; row++) {

                _rowHeaders.push(rowHeaderParser(row, col, rows));
                _cells.push([]);
                for (var col = 0; col < cols; col++) {

                    if (row === 0) {
                        _colHeaders.push(colHeaderParser(row, col, cols));
                    }
                    _cells[row].push(itemParser(row, col));
                }
            }

            return new CxGridMatrix(_rowHeaders, _colHeaders, _cells);
        }

        function itemParser(row, col) {

            return {
                title: 'Closed answer',
                label: row + '-' + col,
                score: Math.floor(Math.random() * 10) % 5
            };
        }

        function colHeaderParser(row, col, total) {

            return {
                label: 'C' + (col + 1),
                count: col + 1,
                total: total,
                score: Math.floor(Math.random() * 10) % 5
            };
        }

        function rowHeaderParser(row, col, total) {

            return {
                label: 'R' + (row + 1),
                count: row + 1,
                total: total,
                score: Math.floor(Math.random() * 10) % 5
            };
        }
    }
]);
