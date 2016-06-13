describe('CxMatrix', function() {
    'use strict';

    var matrix;

    beforeEach(module('ng.cx.grid.CxMatrix'));

    beforeEach(inject(function (CxMatrix) {

        matrix = new CxMatrix();
        matrix.rowHeaders = ['h_1', 'h_2', 'h_3', 'h_4', 'h_5', 'h_6', 'h_7', 'h_8', 'h_9'];
        matrix.colHeaders = ['c_1', 'h_2', 'h_3', 'h_4', 'h_5', 'h_6', 'h_7', 'h_8', 'h_9'];

        //for (var row = 0; row < matrix.width; row++) {
            //for (var col = 0; col < matrix.height; col++) {
                //matrix.cells[row][col] = row + '_' + col;
            //}
        //}
    }));

    describe('width', function() {
        it('returns the length of the colHeaders', function() {
            expect(matrix.width).toBe(matrix.colHeaders.length);
        });
    });

    describe('height', function() {
        it('returns the length of the rowHeaders', function() {
            expect(matrix.width).toBe(matrix.rowHeaders.length);
        });
    });

    describe('getFullColumn method', function() {

        it('returns an array containing the header cell in the first position and the matrix´s cells after it' , function() {

        });

    });

    describe('getFullRow method', function() {

    });



});

