(function(angular) {

    'use strict';

    /**********************************************************
     *
     * @ngdoc module
     * @name ng.cx.grid.
     *
     **********************************************************/

    angular.module('ng.cx.grid.example', [
            'ng.cx.grid',
            'ng.cx.grid.example.components',
            'gridData'
        ])
        .controller('exampleController', [
            '$scope',
            'GridData',
            exampleController
        ]);

    function exampleController($scope, GridData) {

        var _gridData;

        _init();

        $scope.test = 'test';
        $scope.gridData = _gridData;

        function _init() {
            _gridData = new GridData(2, 2);
        }
    }

}(angular));
