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
    '$timeout',
    function $CxCell($compile, $rootScope, $timeout) {
        'use strict';

        return CxCell;

        function CxCell(data, template, restrictions) {
            var _self = this,
                _data = data,
                _highlightingClass = 'highlight',
                _relativeMeasure,
                _absoluteMeasure,
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

            Object.defineProperty(this, 'relativeTop', {
                get: getRelativeTop
            });

            Object.defineProperty(this, 'relativeLeft', {
                get: getRelativeLeft
            });
            Object.defineProperty(this, 'absoluteTop', {
                get: getAbsoluteTop
            });

            Object.defineProperty(this, 'absoluteLeft', {
                get: getAbsoluteLeft
            });

            this.switchHighlighting = switchHighlighting;

            /**********************************************************
             * RUN
             **********************************************************/

            _$element = _render(data, template, restrictions);

            /**********************************************************
             * METHODS
             **********************************************************/

            function switchHighlighting(switchValue) {
                switch (switchValue) {
                    case 'on':
                        _$element.addClass(_highlightingClass);
                        break;
                    case 'off':
                        _$element.removeClass(_highlightingClass);
                        break;
                    default:
                        _$element.toggleClass(_highlightingClass);
                        break;
                }
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
                return _getAbsoluteMeasure(_$element, 'width');
            }

            function getHeight() {
                return _getAbsoluteMeasure(_$element, 'height');
            }

            function getAbsoluteTop() {
                return _getAbsoluteMeasure(_$element, 'top');
            }

            function getAbsoluteLeft() {
                return _getAbsoluteMeasure(_$element, 'left');
            }

            function getRelativeTop() {
                return _getRelativeMeasure(_$element, 'top');
            }

            function getRelativeLeft() {
                return _getRelativeMeasure(_$element, 'left');
            }

            function _getAbsoluteMeasure($element, measure) {
                if (!_absoluteMeasure) {
                    _absoluteMeasure = _calculateAbsoluteMeasure($element);
                }
                return _absoluteMeasure[measure];
            }

            function _getRelativeMeasure($element, measure) {
                if (!_relativeMeasure) {
                    _relativeMeasure = _calculateRelativeMeasure($element);
                }
                return _relativeMeasure[measure];
            }
        }

        function _render(data, template, restrictions) {
            var $element, tpl;

            tpl = '<div class="cx-grid-cell"><div class="cx-grid-cell-renderer" ###directiveId###></div></div>';
            tpl = tpl.replace('###directiveId###', template);
            $element = _renderItem(data, tpl);

            if (restrictions) {
                _applyRestrictions($element, restrictions);
            }

            return $element;
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

        function _calculateAbsoluteMeasure($element) {
            return $element[0].getBoundingClientRect();
        }

        function _calculateRelativeMeasure($element) {
            var element = _calculateAbsoluteMeasure($element),
                $parent = $element.parent(),
                parent;

            parent = ($parent) ? _calculateAbsoluteMeasure($parent) : null;

            return {
                left: element.left - ((parent) ? parent.left : 0),
                top: element.top - ((parent) ? parent.top : 0)
            };
        }
    }
])

/**********************************************************/
;
