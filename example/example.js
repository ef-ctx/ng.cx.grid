angular.module('ng.cx.grid.example', ['ng.cx.grid'])

.controller('exampleController', [
    '$scope',
    function($scope) {
        'use strict';

        var _columnHeders = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            _rowHeders = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
            _rawMatrix = [
                ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9'],
                ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'],
                ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
                ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
                ['e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9'],
                ['f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'],
                ['g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9'],
                ['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9'],
                ['i0', 'i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9'],
                ['j0', 'j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9']
            ],
            _matrix = [];

        _init();

        $scope.test = 'test';
        $scope.matrix = _matrix;
        $scope.rowHeaders = _rowHeders;
        $scope.columnHeaders = _columnHeders;

        function _init() {
            _initializeMatrix();
        }

        function _initializeMatrix() {
            _matrix = _rawMatrix.map(function(row) {
                return row.map(itemParser);
            });
            _rowHeders = _rowHeders.map(itemParser);
            _columnHeders = _columnHeders.map(itemParser);
        }

        function itemParser (item) {
            return {
                label: item
            };
        }
    }
])

.directive('cellRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            template: '<div class="cell-basic-renderer"><span class="label" ng-bind="dataProvider.label"></span></div>',
        };
    }
])

.directive('rowHeaderRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            template: '<div class="cell-basic-renderer row-header"><span class="label" ng-bind="dataProvider.label"></span></div>',
        };
    }
])

.directive('columnHeaderRenderer', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            template: '<div class="cell-basic-renderer column-header"> <span class="label" ng-bind="dataProvider.label"></span></div>',
        };
    }
])
;
