describe('CxMatrix', function() {
    'use strict';

    var matrix,
        _cells,
        _width = 5,
        _height = 7,
        _factory = new ObjFactory();

    function ObjFactory() {
        this.createInstance = function(data) {
            return new Obj(data);
        };
    }

    function Obj(data) {
        this.data = data;
    }

    beforeEach(module('ng.cx.grid.CxMatrix'));

    describe('creating a matrix', function() {

        describe('without passing an initial value', function() {

            beforeEach(inject(function(CxMatrix) {
                matrix = new CxMatrix();
            }));

            it('creates an empty matrix with width and height = 0', function() {
                expect(matrix.width).toBe(0);
                expect(matrix.height).toBe(0);
            });
        });

        describe('passing a raw_matrix as input', function() {

            beforeEach(inject(function(CxMatrix) {

                _cells = [];

                for (var row = 0; row < _height; row++) {
                    _cells[row] = [];
                    for (var col = 0; col < _width; col++) {
                        _cells[row][col] = _factory.createInstance(row + '_' + col);
                    }
                }

                matrix = new CxMatrix(_cells);
            }));

            describe('width', function() {

                it('returns the length of the column array', function() {
                    expect(matrix.width).toBe(_width);
                });
            });

            describe('height', function() {

                it('returns the length of the arrays of the 2nd dimension of the array', function() {
                    expect(matrix.height).toBe(_height);
                });
            });

            describe('getCellAt(x,y)', function() {

                it('should return the cell at x column and y row', inject(function() {
                    expect(matrix.getCellAt(2, 3).data).toBe('2_3');
                }));
            });

            describe('getColAt(x)', function() {

                it('returns an array containing the matrix´s cells at column specified', function() {
                    var column = matrix.getColAt(2);

                    expect(column[0].data).toBe('0_2');
                    expect(column[4].data).toBe('4_2');
                });
            });

            describe('getRowAt(x)', function() {

                it('returns an array containing the matrix´s cells at row specified', function() {
                    var row = matrix.getRowAt(2);

                    expect(row[0].data).toBe('2_0');
                    expect(row[4].data).toBe('2_4');
                });
            });

            describe('addRowAt(index, cells)', function() {

                var cells, row;

                beforeEach(function() {

                    cells = [
                        'foo_0',
                        'foo_1',
                        'foo_2',
                        'foo_3',
                        'foo_4',
                        'foo_5',
                        'foo_6'
                    ];

                    cells = cells.map(_factory.createInstance);

                    matrix.addRowAt(2, cells);

                    row = matrix.getRowAt(2);
                });

                it('adds the cells at the specified row index', function() {
                    expect(row[0].data).toBe('foo_0');
                    expect(row[6].data).toBe('foo_6');
                });

                it('increments the height in one', function() {
                    expect(matrix.height).toBe(_height + 1);
                });


            });

            describe('addColAt(index, cells)', function() {

                var header, cells, col;

                beforeEach(function() {

                    cells = [
                        'foo_0',
                        'foo_1',
                        'foo_2',
                        'foo_3',
                        'foo_4'
                    ];

                    cells = cells.map(_factory.createInstance);

                    matrix.addColAt(2, cells);

                    col = matrix.getColAt(2);
                });

                it('adds the colHeader at the specified index', function() {
                    expect(col[0].data).toBe('foo_0');
                });

                it('adds the cells at the specified col index', function() {
                    expect(col[1].data).toBe('foo_1');
                    expect(col[4].data).toBe('foo_4');
                });

                it('increments the width in one', function() {
                    expect(matrix.width).toBe(_width + 1);
                });
            });

            describe('map', function() {

                var mappedMatrix;

                beforeEach(function () {

                    mappedMatrix = matrix.map(fooMap);

                    function fooMap(item, col, row, matrix) {
                        item.data = item.data + '*';
                        item.foo = 'bar';

                        return item;
                    }
                });


                it('returns a new matrix after applying map to all of them', function() {
                    expect(mappedMatrix.getCellAt(0,0).data).toBe('0_0*');
                    expect(mappedMatrix.getCellAt(0,0).foo).toBe('bar');
                    expect(mappedMatrix.getCellAt(4,4).data).toBe('4_4*');
                    expect(mappedMatrix.getCellAt(4,4).foo).toBe('bar');
                });
            });

        });
    });
});

