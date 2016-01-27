angular.module('ng.cx.grid.example', ['ng.cx.grid'])

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
            var width = 15,
                height = 15;

            for (var row = 0; row < height; row++) {
                _rowHeaders.push(itemParser('r-' + row));
                _matrix.push([]);
                for (var col = 0; col < width; col++) {
                    if(row===0) {
                        _columnHeaders.push(itemParser('c-' + col));
                    }
                    _matrix[row].push(itemParser(row + '-' + col));
                }
            }
        }

        function itemParser (item) {
            return {
                title: 'Title',
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
            templateUrl: '/cellRenderer.html',
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
            templateUrl: '/rowHeaderRenderer.html',
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
            templateUrl: '/colHeaderRenderer.html'
        };
    }
])
;
