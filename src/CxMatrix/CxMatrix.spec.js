describe('CxMatrix', function() {
    //'use strict';

    //var matrix,
        //_rowHeaders = ['r_0', 'r_1', 'r_2', 'r_3', 'r_4', 'r_5', 'r_6', 'r_7', 'r_8', 'r_9'],
        //_colHeaders = ['c_0', 'c_1', 'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9'],
        //_cells = [],
        //_factory = new ObjFactory();

    //function ObjFactory() {
        //this.createInstance = function(data) {
            //console.log('hey');

            //return new Obj(data);
        //};
    //}

    //function Obj(data) {
        //this.data = data;
    //}

    //beforeEach(module('ng.cx.grid.CxMatrix'));

    //beforeEach(inject(function(CxMatrix) {

        //for (var col = 0; col < _colHeaders.length; col++) {
            //_cells[col] = [];
            //for (var row = 0; row < _rowHeaders.length; row++) {
                //_cells[col][row] = col + '_' + row;
            //}
        //}

        //matrix = new CxMatrix(
            //_colHeaders,
            //_rowHeaders,
            //_cells,
            //_factory
        //);

    //}));

    //describe('width', function() {
        //it('returns the length of the colHeaders', inject(function() {
            //expect(matrix.width).toBe(_colHeaders.length);
        //}));
    //});

    //describe('height', function() {
        //it('returns the length of the rowHeaders', function() {
            //expect(matrix.width).toBe(10);
        //});
    //});

    //describe('getCellAt(x,y)', function() {
        //it('should return the cell at x column and y row', inject(function() {
            //var data = matrix.getCellAt(0, 0).data;
            //expect(data).toBe('0_0');
        //}));
    //});

    //describe('getRowHeaderAt()index)', function() {
        //it('returns the RowHeader at index', function() {
            //expect(matrix.getRowHeaderAt(2).data).toBe('r_2');
        //});
    //});

    //describe('getColHeaderAt(index)', function() {
        //it('returns the ColHeader at index', function() {
            //expect(matrix.getColHeaderAt(2).data).toBe('c_2');
        //});
    //});

    //describe('constructor', function() {
        //describe('providing a constructor function', function() {
            //it('maps the data with the constructor function', function() {
                //expect(matrix.getCellAt(0, 0) instanceof Obj).toBe(true);
            //});
        //});
    //});

    //describe('getColAt(x)', function() {

        //it('returns an array containing the header cell in the first position and the matrix´s cells after it', function() {
            //var column = matrix.getColAt(2);

            //expect(column[0].data).toBe('c_2');
            //expect(column[1].data).toBe('2_0');
            //expect(column[2].data).toBe('2_1');
            //expect(column[3].data).toBe('2_2');
            //expect(column[4].data).toBe('2_3');
            //expect(column[5].data).toBe('2_4');
            //expect(column[6].data).toBe('2_5');
        //});
    //});

    //describe('getRowAt(x)', function() {

        //it('returns an array containing the header cell in the first position and the matrix´s cells after it', function() {
            //var row = matrix.getRowAt(2);

            //expect(row[0].data).toBe('r_2');
            //expect(row[6].data).toBe('5_2');
        //});
    //});

    //describe('addRowAt(index, header, cells)', function() {

        //var header = 'foo',
            //cells = [
                //'foo_0',
                //'foo_1',
                //'foo_2',
                //'foo_3',
                //'foo_4',
                //'foo_5',
                //'foo_6',
                //'foo_7',
                //'foo_8',
                //'foo_9'
            //],
            //row;

        //beforeEach(function() {
            //matrix.addRowAt(2, header, cells);
            //row = matrix.getRowAt(2);
        //});

        //it('adds the rowHeader at the specified index', function() {
            //expect(row[0].data).toBe('foo');
        //});

        //it('adds the cells at the specified row index', function() {
            //expect(row[1].data).toBe('foo_0');
            //expect(row[10].data).toBe('foo_9');
        //});

    //});

    //describe('addColAt(index, header, cells)', function() {

        //var header = 'foo',
            //cells = [
                //'foo_0',
                //'foo_1',
                //'foo_2',
                //'foo_3',
                //'foo_4',
                //'foo_5',
                //'foo_6',
                //'foo_7',
                //'foo_8',
                //'foo_9'
            //],
            //col;

        //beforeEach(function() {
            //matrix.addColAt(2, header, cells);
            //col = matrix.getColAt(2);
        //});

        //it('adds the colHeader at the specified index', function() {
            //expect(col[0].data).toBe('foo');
        //});

        //it('adds the cells at the specified col index', function() {
            //expect(col[1].data).toBe('foo_0');
            //expect(col[10].data).toBe('foo_9');
        //});

    //});



});
