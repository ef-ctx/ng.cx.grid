angular.module('ng.cx.grid.example', ['ng.cx.grid'])

.controller('exampleController', [
    '$scope',
    function($scope) {
        'use strict';

        var _columnHeders = [], _rowHeders = [], _matrix = [];

        _init();

        $scope.test = 'test';
        $scope.matrix = _matrix;
        $scope.rowHeaders = _rowHeders;
        $scope.columnHeaders = _columnHeders;

        function _init() {
            _initializeMatrix();
        }

        function _initializeMatrix() {
            var width = 15,
                height = 15;

            for (var row = 0; row < width; row++) {
                _rowHeders.push(itemParser('r-' + row));
                _matrix.push([]);
                for (var col = 0; col < height; col++) {
                    if(row===0) {
                        _columnHeders.push(itemParser('c-' + col));
                    }
                    _matrix[row].push(itemParser(row + '-' + col));
                }
            }
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
