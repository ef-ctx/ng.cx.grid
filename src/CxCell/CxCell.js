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

        function CxCell(data, template, cellParentScope) {

            var _self = this,
                _data = data,
                _children = [],
                _rowHeader,
                _colHeader,
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

            this.resize = function resize(width, height) {
                var w = width || (_colHeader ? _colHeader.width : 0),
                    h = height || (_rowHeader ? _rowHeader.height : 0);

                _resize(_$element, w, h);
            };

            this.position = function position(left, top) {
                var l = left || (_colHeader) ? _colHeader.relativeLeft : null,
                    t = top || (_rowHeader) ? _rowHeader.relativeTop : null;

                _relativeMeasure = null;
                _absoluteMeasure = null;

                _position(_$element, l, t);
            };

            this.positionByHeaders = function PositionByHeaders(rowHeader, colHeader) {
                _colHeader = colHeader;
                _rowHeader = rowHeader;
                _self.position();
                _self.resize();
            };

            this.on = function on(eventName, handler) {
                _$element.on(eventName, function(event) {
                    handler.call(this, event, _self);
                });
            };

            this.select = function() {

                if (_$element.hasClass('selected')) {
                    _self.deSelect();
                } else {
                    _$element.addClass('selected');
                }
            };

            this.deSelect = function() {
                _$element.removeClass('selected');
            };

            /**********************************************************
             * CONSTRUTOR
             **********************************************************/

            _init();

            function _init() {
                _$element = _render(data, template, cellParentScope);
            }

            /**********************************************************
             * ACCESSORS
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

        function _render(data, template, cellParentScope) {
            var scope = $rootScope.$new(true, cellParentScope),
                tpl = '<div class="cx-grid-cell"><div class="cx-grid-cell-renderer" ###directiveId###></div></div>';

            tpl = tpl.replace('###directiveId###', template);

            scope.dataProvider = data;
            return $compile(tpl)(scope);
        }

        function _resize($element, width, height) {

            $element.css('width', width + 'px');
            $element.css('height', height + 'px');
        }

        function _position($element, left, top) {

            if (angular.isNumber(left) && angular.isNumber(top)) {
                $element.css('transform', 'translate3d(' + (left || 0) + 'px,' + (top || 0) + 'px, 0px )');
            }
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
                left: element.left - ((parent) ? parent.left : 0) + $parent[0].scrollLeft,
                top: element.top - ((parent) ? parent.top : 0) + $parent[0].scrollTop
            };
        }
    }
])

/**********************************************************/
;
