/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.cell
 *
 **********************************************************/

angular.module('ng.cx.grid.example.overview.cell',[])

.directive('overviewCellRenderer', [
    '$interval',
    function($interval) {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {
                dataProvider: '=?ioDataProvider'
            },
            templateUrl: 'example/app/components/overview/cell/cell.html',
            link: function($scope, $element, $attrs, controller) {
                var _intervalMs = ((Math.floor(Math.random() * 10) % 8) + 10 ) * 100,
                    _interval;

                window.parties.push(function () {
                    _interval = $interval(_changeStatus, _intervalMs);
                });

                window.stopParties.push(function () {
                    $interval.cancel(_interval);
                });

                function _changeStatus() {
                    $scope.dataProvider.score = Math.floor(Math.random() * 10) % 5;
                }
            }
        };
    }
])

/**********************************************************/
;
