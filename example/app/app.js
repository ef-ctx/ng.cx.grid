/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.
 *
 **********************************************************/

angular.module('ng.cx.grid.example',[
    'ng.cx.grid',
    'ng.cx.grid.example.corner',
    'ng.cx.grid.example.cell',
    'ng.cx.grid.example.colHeader',
    'ng.cx.grid.example.rowHeader',
    'ng.cx.grid.example.overview.corner',
    'ng.cx.grid.example.overview.cell',
    'ng.cx.grid.example.overview.colHeader',
    'ng.cx.grid.example.overview.rowHeader'
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
                height = 30;

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

        window.party = function (){
            for (var ix = 0; ix < window.parties.length; ix++) {
                window.parties[ix]();
            }
        };
        window.enough = function (){
            for (var ix = 0; ix < window.parties.length; ix++) {
                window.stopParties[ix]();
            }
        };

        window.parties = [];
        window.stopParties = [];

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
