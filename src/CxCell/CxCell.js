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

        function CxCell(data, template, cellParentScope, rowHeader, colHeader) {

            var _self = this,
                _data = data,
                _rowHeader = rowHeader,
                _colHeader = colHeader,
                _isHighlighted = false,
                _highlightingClass = 'highlight',
                _relativeMeasure,
                _absoluteMeasure,
                _$element;

            Object.defineProperty(this, 'data',         { get: getData         });
            Object.defineProperty(this, '$element',     { get: get$element     });
            Object.defineProperty(this, 'width',        { get: getWidth        });
            Object.defineProperty(this, 'height',       { get: getHeight       });
            Object.defineProperty(this, 'relativeTop',  { get: getRelativeTop  });
            Object.defineProperty(this, 'relativeLeft', { get: getRelativeLeft });
            Object.defineProperty(this, 'absoluteTop',  { get: getAbsoluteTop  });
            Object.defineProperty(this, 'absoluteLeft', { get: getAbsoluteLeft });

            this.rowHeader = rowHeader;
            this.colHeader = colHeader;

            this.toggleHighlight = function toggleHighlight() {
                _isHighlighted = !_isHighlighted;
                return (_isHighlighted) ? _self.highlight() : _self.unHighlight();
            };

            this.highlight = function highlight() {
                _isHighlighted = true;
                _$element.addClass(_highlightingClass);
            };

            this.unHighlight = function unHighlight() {
                _isHighlighted = false;
                _$element.removeClass(_highlightingClass);
            };

            this.resize = function resize(width, height) {
                var w = width || _colHeader.width,
                    h = height || _rowHeader.height;

                _resize(_$element, w, h);
            };

            this.position = function position(left, top) {
                var l = left || (_colHeader) ? _colHeader.relativeLeft : null,
                    t = top || (_rowHeader) ? _rowHeader.relativeTop: null;

                _relativeMeasure = null;
                _absoluteMeasure = null;

                _position(_$element, l, t);
            };

            /**********************************************************
             * RUN
             **********************************************************/

            _$element = _render(data, template, cellParentScope, _rowHeader, _colHeader);

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

        function _render(data, template, cellParentScope, rowHeader, colHeader) {
            var $element = _renderItem(data, template, cellParentScope);

            if (rowHeader && colHeader) {
                _resize($element, colHeader.width, rowHeader.height);
                _position($element, colHeader.relativeLeft, rowHeader.relativeTop);
            }

            return $element;
        }

        function _resize($element, width, height) {

            $element.css('width', width + 'px');
            $element.css('height', height + 'px');
        }

        function _position($element, left, top) {

            if(angular.isNumber(left) && angular.isNumber(top)) {
                $element.css('transform', 'translate3d(' + (left || 0) + 'px,' + (top || 0) + 'px, 0px )');
            }
        }

        function _renderItem(data, template, cellParentScope) {
            var scope = $rootScope.$new(true, cellParentScope),
                tpl = '<div class="cx-grid-cell"><div class="cx-grid-cell-renderer" ###directiveId###></div></div>';

            tpl = tpl.replace('###directiveId###', template);

            scope.dataProvider = data;
            return $compile(tpl)(scope);
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
