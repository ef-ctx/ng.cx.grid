(function(angular) {

    'use strict';

    angular
        .module('gridData', [])
        .factory('GridData', [GridDataFactory]);

    function GridDataFactory() {
        return GridData;
    }

    function GridData(rows, columns) {

        var _colHeaders = [],
            _rowHeaders = [],
            _cells = [];

        this.addRowAt = addRowAt;
        this.addColumnAt = addColumnAt;

        Object.defineProperty(this, 'rowHeaders', {
            get: function () {
                return _rowHeaders;
            }
        });

        Object.defineProperty(this, 'colHeaders', {
            get: function () {
                return _colHeaders;
            }
        });

        Object.defineProperty(this, 'cells', {
            get: function () {
                return _cells;
            }
        });

        function addRowAt(index, header, cells) {
            _addRowHeaderAt(index, header);
            _addCellsRowAt(index, cells);
        }

        function addColumnAt(index, header, cells) {
            _addColHeaderAt(index, header);
            _addCellsColumnAt(index, cells);
        }

        _init();

        function _init() {

            for (var row = 0; row < columns; row++) {
                _rowHeaders.push(rowHeaderParser(row, col, columns));
                _cells.push([]);
                for (var col = 0; col < rows; col++) {
                    if (row === 0) {
                        _colHeaders.push(colHeaderParser(row, col, rows));
                    }
                    _cells[row].push(itemParser(row, col));
                }
            }
        }

        // Add Row Helpers
        function _addRowHeaderAt(index, header) {
            _rowHeaders.splice(index, 0, header);
        }

        function _addCellsRowAt(index, cells) {
            _cells.splice(index, 0, cells);
        }

        // Add Column Helpers
        function _addColHeaderAt(index, header) {
            _colHeaders.splice(index, 0, header);
        }

        function _addCellsColumnAt(index, cells) {
            for (var ix = 0; ix < _cells.length; ix++) {
                _cells[ix].splice(index, 0, cells[ix]);
            }
        }
    }

    function itemParser(row, col) {

        return {
            title: 'Closed answer',
            label: row + '-' + col,
            score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
        };
    }

    function colHeaderParser(row, col, total) {
        return {
            label: col + 1,
            count: col + 1,
            total: total,
            score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
        };
    }

    function rowHeaderParser(row, col, total) {
        return {
            label: row + 1,
            count: col + 1,
            total: total,
            score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
        };
    }


}(angular));
