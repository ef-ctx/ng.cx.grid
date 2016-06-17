describe('CxGridMatrix', function() {
    'use strict';

    var matrix,
        _rowHeaders,
        _colHeaders,
        _cells,
        _factory = new ObjFactory();

    function ObjFactory() {
        this.createInstance = function(data) {
            return new Obj(data);
        };
    }

    function Obj(data) {
        this.data = data;
    }

    beforeEach(module('ng.cx.grid.CxGridMatrix'));

    beforeEach(inject(function(CxGridMatrix) {

        _rowHeaders = ['r_0', 'r_1', 'r_2', 'r_3', 'r_4', 'r_5', 'r_6', 'r_7', 'r_8', 'r_9'];
        _colHeaders = ['c_0', 'c_1', 'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9'];
        _cells = [];

        for (var row = 0; row < _rowHeaders.length; row++) {
            _cells[row] = [];
            for (var col = 0; col < _colHeaders.length; col++) {
                _cells[row][col] = _factory.createInstance(row + '_' + col);
            }
        }

        _rowHeaders = _rowHeaders.map(_factory.createInstance);
        _colHeaders = _colHeaders.map(_factory.createInstance);

        matrix = new CxGridMatrix(
            _rowHeaders,
            _colHeaders,
            _cells
        );
    }));

    describe('width', function() {

        it('returns the length of the rowHeaders', inject(function() {
            expect(matrix.width).toBe(_rowHeaders.length);
        }));
    });

    describe('height', function() {

        it('returns the length of the colHeaders', function() {
            expect(matrix.height).toBe(_colHeaders.length);
        });
    });

    describe('getCellAt(x,y)', function() {

        it('should return the cell at x column and y row', inject(function() {
            expect(matrix.getCellAt(2, 3).data).toBe('2_3');
        }));
    });

    describe('getRowHeaderAt()index)', function() {

        it('returns the RowHeader at index', function() {
            expect(matrix.getRowHeaderAt(2).data).toBe('r_2');
        });
    });

    describe('getColHeaderAt(index)', function() {

        it('returns the ColHeader at index', function() {
            expect(matrix.getColHeaderAt(2).data).toBe('c_2');
        });
    });


    describe('getRowAt(x)', function() {

        it('returns an array containing the header cell in the first position and the matrix´s cells after it', function() {
            var row = matrix.getRowAt(2);

            expect(row[0].data).toBe('r_2');
            expect(row[5].data).toBe('2_4');
        });
    });

    describe('getColAt(x)', function() {

        it('returns an array containing the header cell in the first position and the matrix´s cells after it', function() {
            var column = matrix.getColAt(2);

            expect(column[0].data).toBe('c_2');
            expect(column[4].data).toBe('3_2');
        });
    });
    describe('getAxisByHeader(header)', function() {

        it('when providing a column header returns the column for the correspondant header', function() {
            var header = matrix.getColHeaderAt(3),
                axis = matrix.getAxisByHeader(header),
                column = matrix.getColAt(3);

            expect(axis[0]).toBe(column[0]);
            expect(axis[1]).toBe(column[1]);
            expect(axis[2]).toBe(column[2]);
            expect(axis[3]).toBe(column[3]);
            expect(axis[4]).toBe(column[4]);
        });

        it('when providing a row header returns the row for the correspondant header', function() {
            var header = matrix.getRowHeaderAt(3),
                axis = matrix.getAxisByHeader(header),
                column = matrix.getRowAt(3);

            expect(axis[0]).toBe(column[0]);
            expect(axis[1]).toBe(column[1]);
            expect(axis[2]).toBe(column[2]);
            expect(axis[3]).toBe(column[3]);
            expect(axis[4]).toBe(column[4]);
        });

        it('throws an error when the header is not present on the headers lists', function() {
            expect(function() {
                matrix.getAxisByHeader({
                    id: 2
                });
            }).toThrow();
        });
    });


    describe('addRowAt(index, header, cells)', function() {

        var header, cells, row;

        beforeEach(function() {

            header = _factory.createInstance('foo');

            cells = [
                'foo_0',
                'foo_1',
                'foo_2',
                'foo_3',
                'foo_4',
                'foo_5',
                'foo_6',
                'foo_7',
                'foo_8',
                'foo_9'
            ];

            cells = cells.map(_factory.createInstance);

            matrix.addRowAt(2, header, cells);

            row = matrix.getRowAt(2);
        });

        it('adds the rowHeader at the specified index', function() {
            expect(row[0].data).toBe('foo');
        });

        it('adds the cells at the specified row index', function() {
            expect(row[1].data).toBe('foo_0');
            expect(row[10].data).toBe('foo_9');
        });
    });

    describe('addColAt(index, header, cells)', function() {

        var header, cells, col;

        beforeEach(function() {

            header = _factory.createInstance('foo');

            cells = [
                'foo_0',
                'foo_1',
                'foo_2',
                'foo_3',
                'foo_4',
                'foo_5',
                'foo_6',
                'foo_7',
                'foo_8',
                'foo_9'
            ];

            cells = cells.map(_factory.createInstance);

            matrix.addColAt(2, header, cells);

            col = matrix.getColAt(2);

        });

        it('adds the colHeader at the specified index', function() {
            expect(col[0].data).toBe('foo');
        });

        it('adds the cells at the specified col index', function() {
            expect(col[1].data).toBe('foo_0');
            expect(col[10].data).toBe('foo_9');
        });
    });

    describe('map(colHeaderMapFn, rowHeaderMapFn, cellsMapFn)', function() {

        var mappedMatrix;

        beforeEach(function() {

            function mapRowHeader(item, index, headers) {

                item.foo = 'row header ' + index;
                return item;
            }

            function mapColHeader(item, index, headers) {

                item.foo = 'col header ' + index;
                return item;
            }

            function mapCells(item, rowIndex, colIndex, matrix) {

                item.foo = 'matrix cell [' + rowIndex + ', ' + colIndex + ']';
                return item;
            }

            mappedMatrix = matrix.map(mapRowHeader, mapColHeader, mapCells);
        });

        it('maps the rowHeaders array with the provided function', function() {

            expect(mappedMatrix.getRowHeaderAt(0).foo).toBe('row header 0');
            expect(mappedMatrix.getRowHeaderAt(1).foo).toBe('row header 1');
            expect(mappedMatrix.getRowHeaderAt(2).foo).toBe('row header 2');
        });

        it('maps the colHeaders array with the provided function', function() {

            expect(mappedMatrix.getColHeaderAt(0).foo).toBe('col header 0');
            expect(mappedMatrix.getColHeaderAt(1).foo).toBe('col header 1');
            expect(mappedMatrix.getColHeaderAt(2).foo).toBe('col header 2');
        });

        it('maps the cells matrix with the provided function', function() {

            expect(mappedMatrix.getCellAt(0, 0).foo).toBe('matrix cell [0, 0]');
            expect(mappedMatrix.getCellAt(0, 1).foo).toBe('matrix cell [0, 1]');
            expect(mappedMatrix.getCellAt(1, 1).foo).toBe('matrix cell [1, 1]');
            expect(mappedMatrix.getCellAt(2, 1).foo).toBe('matrix cell [2, 1]');
            expect(mappedMatrix.getCellAt(2, 2).foo).toBe('matrix cell [2, 2]');
            expect(mappedMatrix.getCellAt(2, 4).foo).toBe('matrix cell [2, 4]');
        });

    });

});
