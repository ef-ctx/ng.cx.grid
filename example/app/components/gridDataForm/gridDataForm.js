/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.gridDataForm
 *
 **********************************************************/

angular.module('ng.cx.grid.example.components.gridDataForm', [
    'ng.cx.grid.grid'
])

/**********************************************************
 *
 * @ngdoc directive
 * @name gridDataForm
 *
 **********************************************************/

.directive('gridDataForm', [

    function gridDataForm() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            templateUrl: 'example/app/components/gridDataForm/gridDataForm.tpl.html',
            scope: true,
            bindToController: {
                ioDataProvider: '='
            },
            controller: 'gridDataFormController as formCtrl'
        };
    }
])

/**********************************************************
 *
 * @ngdoc controller
 * @name gridDataFormController
 *
 **********************************************************/

.controller('gridDataFormController', [
    '$scope',
    function gridDataFormController($scope) {
        'use strict';

        var _matrix = this.ioDataProvider;

        this.addRow = addRow;
        this.addColumn = addColumn;

        function addRow() {
            var line = new Line('NR', 2);
            _matrix.addRowAt(0, line.header, []);
        }

        function addColumn() {
            var line = new Line('NC', 3);
            _matrix.addColAt(0, line.header, []);
        }

        function Line(label, score) {
            return {
                header: {
                    label: label
                },
                cells: [{
                    score: score
                }, {
                    score: score
                }, {
                    score: score
                }, {
                    score: score
                }, {
                    score: score
                }, {
                    score: score
                }, {
                    score: score
                }, {
                    score: score
                }, {
                    score: score
                }]
            };
        }

    }
])





/**********************************************************/
;
