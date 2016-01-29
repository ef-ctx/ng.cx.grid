angular.module('ng.cx.grid.cell', [
    'ng.cx.grid.cell.renderer'
])

/**********************************************************
 *
 * @ngdoc directive
 * @name cxGridCell
 *
 **********************************************************/

.directive('cxGridCell', [

    function cxGridCellRenderer() {
        'use strict';

        return {
            restrict: 'AE',
            replace: 'element',
            scope: {},
            bindToController: {
                ioCxCell: '=?',
                ioRendererDirective: '@?'
            },
            controller: 'cxGridCellController as cellController'
        };
    }
])

/**********************************************************
 *
 * @ngdoc controller
 * @name cxGridCellController
 *
 **********************************************************/

.controller('cxGridCellController', [
    '$compile',
    '$element',
    '$timeout',
    '$scope',
    function $cxGridCellController($compile, $element, $timeout, $scope) {
        'use strict';

        var self = this,
            _renderedElement,
            _rendererDirective = '<div cx-grid-cell-renderer io-data-provider="cxCell"></div>',
            _cxCell = this.ioCxCell;

        /**********************************************************
         * SETTERS
         **********************************************************/
        Object.defineProperty(this, 'ioRendererDirective', {
            set: function(value) {
                if (value && value.length > 0) {
                    _rendererDirective = '<div ' + value + ' io-data-provider="cxCell.data"></div>';
                }
                _render();
            }
        });
        /**********************************************************
         * ACCESSORS
         **********************************************************/

        Object.defineProperty($scope, 'cxCell', {
            get: function() {
                return _cxCell;
            }
        });

        /**********************************************************
         * RUN
         **********************************************************/

        _init();

        /**********************************************************
         * HELPERS
         **********************************************************/

        function _init() {}

        function _render() {
            _renderedElement = $compile(_rendererDirective)($scope);
            $element.append(_renderedElement);
            $timeout(_assignElement);
        }

        function _assignElement() {
            if (_cxCell) {
                _cxCell.$element = _renderedElement;
            }

        }

    }
])

/**********************************************************/

;
