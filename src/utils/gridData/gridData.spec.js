describe('GridData', function() {
    'use strict';

    var gridData;

    beforeEach(module('gridData'));

    beforeEach(inject(function(GridData) {

        gridData = new GridData(4, 4);
    }));

    describe('creating a 4x4 grid, the grid', function() {

        it('has 4 Row Headers', function() {

            expect(gridData.rowHeaders.length).toBe(4);
        });

        it('has 4 Column Headers', function() {

            expect(gridData.colHeaders.length).toBe(4);
        });

        it('has 4 Rows in cells', function() {

            expect(gridData.cells.length).toBe(4);
        });

        it('has 4 Columns in cells', function() {

            expect(gridData.cells[0].length).toBe(4);
        });
    });

    describe('addRowAt method', function() {

        var header, cells;

        beforeEach(function () {

            header = {
                label: 'New Row Header'
            };

            cells = [{
                score: 2
            }, {
                score: 1
            }, {
                score: 4
            }, {
                score: undefined
            }];

            gridData.addRowAt(2, header, cells);
        });


        it('adds a Row Header at the index specified', function() {

            expect(gridData.rowHeaders[2]).toBe(header);
        });

        it('adds a Row in cells at the index specified', function() {

            expect(gridData.cells[2]).toBe(cells);
        });

    });

    describe('addColumnAt method', function() {

        var header, cells;

        beforeEach(function () {

            header = {
                label: 'New Col Header'
            };

            cells = [{
                score: 2
            }, {
                score: 1
            }, {
                score: 4
            }, {
                score: undefined
            }];

            gridData.addColumnAt(2, header, cells);
        });


        it('adds a Column Header at the index specified', function() {

            expect(gridData.colHeaders[2]).toBe(header);
        });

        it('adds a Column in cells at the index specified', function() {

            expect(gridData.cells[0][2].score).toBe(2);
            expect(gridData.cells[1][2].score).toBe(1);
            expect(gridData.cells[2][2].score).toBe(4);
            expect(gridData.cells[3][2].score).toBe(undefined);
        });

    });

});
