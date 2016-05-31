/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.example.gridDataForm
 *
 **********************************************************/

angular.module('ng.cx.grid.example.components.gridDataForm', [])

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
            scope: {},
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
    function gridDataFormController() {
        'use strict';

        var _grid = this.ioDataProvider;

        this.addRow = addRow;
        this.addColumn = addColumn;

        function addRow() {
            var line = new Line(2, 'NR', 2);
            _grid.addRowAt(2, line.header, line.cells);
        }

        function addColumn() {
            var line = new Line(2, 'NC', 3);
            _grid.addColumnAt(2, line.header, line.cells);
        }

        function Line(index, label, score) {
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
