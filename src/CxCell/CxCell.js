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

        function CxCell(data, template, cellParentScope, rowHeader, colHeader, collection) {

            var _self = this,
                _data = data,
                _children = [],
                _rowHeader = rowHeader,
                _colHeader = colHeader,
                _isHighlighted = false,
                _highlightingClass = 'highlight',
                _relativeMeasure,
                _absoluteMeasure,
                _collection = collection,
                _$element;

            Object.defineProperty ( this , 'data'         , { get: getData         } );
            Object.defineProperty ( this , '$element'     , { get: get$element     } );
            Object.defineProperty ( this , 'width'        , { get: getWidth        } );
            Object.defineProperty ( this , 'height'       , { get: getHeight       } );
            Object.defineProperty ( this , 'relativeTop'  , { get: getRelativeTop  } );
            Object.defineProperty ( this , 'relativeLeft' , { get: getRelativeLeft } );
            Object.defineProperty ( this , 'absoluteTop'  , { get: getAbsoluteTop  } );
            Object.defineProperty ( this , 'absoluteLeft' , { get: getAbsoluteLeft } );
            Object.defineProperty ( this , 'index'        , { get: getIndex        } );
            Object.defineProperty ( this , 'children'     , { get: getChildren     } );
            Object.defineProperty ( this , 'isHighlighted', { get: getIsHighlighted} );


            this.rowHeader = rowHeader;
            this.colHeader = colHeader;
            this.addChild = addChild;

            function getIsHighlighted() {
                return _$element.hasClass(_highlightingClass);
            }

            this.highlight = function highlight() {
                _highlightCell(_self);
                _children.map(_highlightCell);
            };

            this.unHighlight = function unHighlight() {
                _unHighlightCell(_self);
                _children.map(_unHighlightCell);
            };

            function _highlightCell(cell) {
                cell.$element.addClass(_highlightingClass);
            }

            function _unHighlightCell(cell) {
                cell.$element.removeClass(_highlightingClass);
            }

            function _toggleHighlight() {
                if(_self.isHighlighted){
                    return _self.unHighlight();
                }
                return _self.highlight();
            }

            this.resize = function resize(width, height) {
                var w = width || _colHeader.width,
                    h = height || _rowHeader.height;

                _resize(_$element, w, h);
            };

            this.position = function position(left, top) {
                var l = left || (_colHeader) ? _colHeader.relativeLeft : null,
                    t = top || (_rowHeader) ? _rowHeader.relativeTop : null;

                _relativeMeasure = null;
                _absoluteMeasure = null;

                _position(_$element, l, t);
            };

            function addChild(cell) {
                _children.push(cell);
            }

            /**********************************************************
             * RUN
             **********************************************************/

            _$element = _render(data, template, cellParentScope, _rowHeader, _colHeader);
            _$element.on('click', _toggleHighlight);

            if(_rowHeader) {
                _rowHeader.addChild(_self);
            }
            if(_colHeader) {
                _colHeader.addChild(_self);
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

            function getIndex() {
                return angular.isArray(_collection) ? _collection.indexOf(_self) : undefined;
            }

            function getChildren() {
                return _children;
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

            if (angular.isNumber(left) && angular.isNumber(top)) {
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
