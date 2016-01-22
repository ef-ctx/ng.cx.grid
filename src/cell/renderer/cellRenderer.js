angular.module('ng.cx.grid.cell.renderer', [])

/**********************************************************
 *
 * @ngdoc directive
 * @name cxGridCellRenderer
 *
 **********************************************************/

.directive('cxGridCellRenderer',[
    function cxGridCellRenderer(){
        'use strict';

        return {
            restrict: 'AE',
            templateUrl: 'src/cell/renderer/cellRenderer.tpl.html',
            scope: {
                dataProvider: '=?ioDataProvider'
            }
        };
    }
])

/**********************************************************/

;
