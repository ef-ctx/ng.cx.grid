angular.module('ng.cx.grid')

/**********************************************************
 *
 * @ngdoc directive
 * @name ngCxGrid
 * @module ng.cx.grid
 *
 **********************************************************/

.directive('ngCxGrid', [
    function() {
        'use strict';

        return {
            restrict: 'AE',
            templateUrl: 'src/ng.cx.grid.tpl.html',
            controller: 'ngCxGridController as gridController',
            scope: {},
            bindToController: {
                ioDataProvider: '=?',
                ioRowHeadersDataProvider: '=?',
                ioColumnsheadersDataProvider: '=?',
                ioCellItemRenderer: '@?',
                ioRowHeaderItemRenderer: '@?',
                ioColumnHeaderItemRenderer: '@?',
            }
        };
    }
])

/**********************************************************
 *
 * @ngdoc controller
 * @name ngCxGridController
 * @module ng.cx.grid
 * @description  Description
 *
 **********************************************************/

.controller('ngCxGridController', [

    function ngCxGridController() {
        'use strict';

        console.log('WORK');

    }
])

/**********************************************************/

;
