/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.CxCell
 *
 **********************************************************/

angular.module('ng.cx.grid.CxCell', [])

/**********************************************************
 *
 * @ngdoc service
 * @name CxCell
 *
 **********************************************************/

.factory('CxCell', [
    '$compile',
    '$rootScope',
    function $CxCell($compile, $rootScope) {
        'use strict';

        return CxCell;

        function CxCell(data, template, restrictions) {
            var _self = this,
                _data = data,
                _$element;

            Object.defineProperty(this, 'data', {
                get: getData
            });

            Object.defineProperty(this, '$element', {
                get: get$element
            });

            Object.defineProperty(this, 'width', {
                get: getWidth
            });

            Object.defineProperty(this, 'height', {
                get: getHeight
            });

            Object.defineProperty(this, 'top', {
                get: getTop
            });

            Object.defineProperty(this, 'left', {
                get: getLeft
            });

            /**********************************************************
             * RUN
             **********************************************************/

            _init();

            /**********************************************************
             * METHODS
             **********************************************************/


            /**********************************************************
             * HELPERS
             **********************************************************/

            function _init() {
                _$element = _render(data, template, restrictions);
            }

            /**********************************************************
             * GETTERS & SETTERS
             **********************************************************/

            function getData() {
                return _data;
            }

            function get$element() {
                return _$element;
            }

            function getWidth() {
                return _getMeasure(_$element, 'width');
            }

            function getHeight() {
                return _getMeasure(_$element, 'height');
            }

            function getTop() {
                return _getMeasure(_$element, 'top');
            }

            function getLeft() {
                return _getMeasure(_$element, 'left');
            }
        }

        function _render(data, template,restrictions) {
            var $element, tpl;

            tpl = '<div class="cell"><div ###directiveId###></div></div>';
            tpl = tpl.replace('###directiveId###', template);
            $element = _renderItem(data, tpl);

            if (restrictions) {
                _applyRestrictions($element, restrictions);
            }

            return $element;
        }

        function _getMeasure($element, measure) {
            return $element[0].getBoundingClientRect()[measure];
        }

        function _applyRestrictions($element, restrictions) {
            if (restrictions.measure) {
                _applyMeasureRestrictions($element, restrictions.measure);
            }

            if (restrictions.position) {
                _applyPositionRestrictions($element, restrictions.position);
            }
        }

        function _applyMeasureRestrictions($element, measure) {
            $element.css('width', measure.width + 'px');
            $element.css('height', measure.height + 'px');
        }

        function _applyPositionRestrictions($element, position) {
            $element.css('transform', 'translate3d(' + (position.x || 0) + 'px,' + (position.y || 0) + 'px, 0px )');
        }

        function _renderItem(data, template) {
            var scope = $rootScope.$new(true);
            scope.dataProvider = data;
            return $compile(template)(scope);
        }

    }
])

/**********************************************************/
;
