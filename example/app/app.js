
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
            _matrix = buildGridData(9, 9);
        }


        function buildGridData(cols, rows) {

            var _colHeaders = [],
                _rowHeaders = [],
                _cells = [];

            for (var col = 0; col < cols; col++) {

                _colHeaders.push(colHeaderParser(col, row, cols));
                _cells.push([]);
                for (var row = 0; row < cols; row++) {

                    if (col === 0) {
                        _rowHeaders.push(rowHeaderParser(col, row, rows));
                    }
                    _cells[col].push(itemParser(col, row));
                }
            }

            return new CxGridMatrix(_colHeaders, _rowHeaders, _cells);
        }

        function itemParser(col, row) {

            return {
                title: 'Closed answer',
                label: col + '-' + row,
                score: Math.floor(Math.random() * 10) % 5
            };
        }

        function rowHeaderParser(col, row, total) {

            return {
                label: 'R' + (row + 1),
                count: row + 1,
                total: total,
                score: Math.floor(Math.random() * 10) % 5
            };
        }

        function colHeaderParser(col, row, total) {

            return {
                label: 'C' + (col + 1),
                count: row + 1,
                total: total,
                score: Math.floor(Math.random() * 10) % 5
            };
        }
    }
]);
