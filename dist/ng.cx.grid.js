(function (angular) {
	'use strict';

	/**********************************************************
	 * 
	 * ng.cx.grid - v0.1.3
	 * 
	 * Release date : 2016-04-22 : 14:10
	 * Author       : Jaime Beneytez - EF CTX 
	 * License      : MIT 
	 * 
	 **********************************************************/
	
	
	
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
	
	/**********************************************************
	 *
	 * @ngdoc module
	 * @name ng.cx.grid.CxGrid
	 *
	 **********************************************************/
	
	angular.module('ng.cx.grid.CxGrid', [
	    'ng.cx.grid.CxCell'
	])
	
	/**********************************************************
	 *
	 * @ngdoc service
	 * @name CxGrid
	 *
	 **********************************************************/
	
	.factory('CxGrid', [
	    '$timeout',
	    'CxCell',
	    function $CxGrid($timeout, CxCell) {
	        
	
	        return CxGrid;
	
	        function CxGrid(
	            gridData,
	            columnHeaderData,
	            rowHeaderData,
	            cellRenderer,
	            columnHeaderRenderer,
	            rowHeaderRenderer,
	            cornerRenderer,
	            $mainContainer,
	            $colHeadersContainer,
	            $rowHeadersContainer,
	            $cellsContainer,
	            $cornerContainer
	        ) {
	
	            console.time('render');
	
	            var _rowHeaders = [],
	                _colHeaders = [],
	                _cells = [
	                    []
	                ],
	                _highlighted = {
	                    x: undefined,
	                    y: undefined
	                };
	
	
	            this.highlightRow = highlightRow;
	            this.highlightColumn = highlightColumn;
	
	            /**********************************************************
	             * IMPLEMENTATION
	             **********************************************************/
	
	            _init();
	
	            /**********************************************************
	             * METHODS
	             **********************************************************/
	
	            function switchLineHighlighting(index, axis, switchValue) {
	                if(_highlighted.x !== undefined) {
	                    _highlighted.x.switchHighlight('off');
	                }
	
	                if(_highlighted.y !== undefined) {
	                    _highlighted.y.switchHighlight('off');
	                }
	
	                _highlighted[axis] = (axis === 'x') ? _getRowByIndex(index) : _getColumnByIndex(index);
	
	                if(_highlighted.x !== undefined) {
	                    _highlighted.x.switchHighlight('on');
	                }
	
	                if(_highlighted.y !== undefined) {
	                    _highlighted.y.switchHighlight('on');
	                }
	            }
	
	            function highlightRow(index) {
	                switchLineHighlighting(index, 'x', 'on');
	            }
	
	            function highlightColumn(index) {
	                switchLineHighlighting(index, 'y', 'on');
	            }
	
	
	            /**********************************************************
	             * HELPERS
	             **********************************************************/
	
	            function _init() {
	                _hideMainContainer();
	                _renderHeaders();
	                $timeout(_renderCorner);
	                $timeout(_renderGrid);
	                $timeout(_showMainContainer);
	            }
	
	            function _hideMainContainer() {
	                $mainContainer.css('opacity', 0);
	            }
	
	            function _showMainContainer() {
	                $mainContainer.css('opacity', 1);
	                console.timeEnd('render');
	            }
	
	            // HEADERS -------------------------------------------------
	
	            function _renderHeaders() {
	                _colHeaders = columnHeaderData.map(_createColHeaderCell);
	                _rowHeaders = rowHeaderData.map(_createRowHeaderCell);
	            }
	
	            function _createColHeaderCell(data) {
	                var cell = _createCell(data, columnHeaderRenderer);
	                $colHeadersContainer.append(cell.$element);
	                return cell;
	            }
	
	            function _createRowHeaderCell(data) {
	                var cell = _createCell(data, rowHeaderRenderer);
	
	                $rowHeadersContainer.append(cell.$element);
	                return cell;
	            }
	
	            // CORNER -------------------------------------------------
	
	            function _renderCorner() {
	                var restrictions = {
	                        measure: {
	                            width: _getMaxMeasure(_rowHeaders, 'width'),
	                            height: _getMaxMeasure(_colHeaders, 'height'),
	                        }
	                    },
	                    cell = _createCell(undefined, cornerRenderer, restrictions);
	
	                $cornerContainer.append(cell.$element);
	            }
	
	            // GRID -------------------------------------------------
	
	            function _renderGrid() {
	                var row,
	                    col,
	                    width = _colHeaders.length,
	                    height = _rowHeaders.length,
	                    restrictions;
	
	                for (row = 0; row < height; row++) {
	                    _cells[row] = [];
	                    for (col = 0; col < width; col++) {
	                        _cells[row][col] = _createGridCell(row, col);
	                    }
	                }
	            }
	
	            function _createGridCell(rowIndex, colIndex) {
	                var cell,
	                    data = gridData[rowIndex][colIndex],
	                    colHeaderCell = _colHeaders[colIndex],
	                    rowHeaderCell = _rowHeaders[rowIndex],
	                    restrictions = {
	                        measure: {
	                            width: colHeaderCell.width,
	                            height: rowHeaderCell.height
	                        },
	                        position: {
	                            x: colHeaderCell.relativeLeft,
	                            y: rowHeaderCell.relativeTop
	                        }
	                    };
	
	                cell = _createCell(data, cellRenderer, restrictions);
	
	                $cellsContainer.append(cell.$element);
	
	                return cell;
	            }
	
	            function _getColumnByIndex(index) {
	                var column = [_colHeaders[index]];
	
	                for (var ix = 0; ix < _cells.length; ix++) {
	                    column.push(_cells[ix][index]);
	                }
	
	                return new GridLine(index, column);
	            }
	
	            function _getRowByIndex(index) {
	                return new GridLine(index, [_rowHeaders[index]].concat(_cells[index]));
	            }
	
	        }
	
	        function _createCell(data, template, restrictions) {
	            return new CxCell(data, template, restrictions);
	        }
	
	        function _getMaxMeasure(elements, measure) {
	            var measures = elements.map(function(cell) {
	                console.log('row Header cell', cell.width, cell.height);
	                return cell[measure];
	            });
	
	            return Math.max.apply(null, measures);
	        }
	
	        function GridLine(index, elements) {
	            var _self = this;
	
	            Object.defineProperty(this, 'index', {
	                get: function() {
	                    return index;
	                }
	            });
	
	            this.switchHighlight = switchHighlight;
	
	            this.isEqual = isEqual;
	
	            function switchHighlight(switchValue) {
	                elements.map(function(element) {
	                    element.switchHighlighting(switchValue);
	                });
	            }
	
	            function isEqual(gridLine) {
	                return _self.index === gridLine.index;
	            }
	        }
	
	
	    }
	])
	
	
	/**********************************************************/
	;
	
	/**********************************************************
	 *
	 * @ngdoc module
	 * @name ng.cx.grid.cxScroll
	 *
	 **********************************************************/
	
	angular.module('ng.cx.grid.cxScroll', [])
	
	/**********************************************************
	 *
	 * @ngdoc directive
	 * @name cxBindScroll
	 *
	 **********************************************************/
	
	.directive('cxScroll', [
	
	    function cxBindScroll() {
	        
	
	        return {
	            restrict: 'AE',
	            bindToController: {
	                ioScrollId: '@',
	                ioScrollRestrictToAxis: '@?',
	                ioSnapCoords: '=?'
	            },
	            controller: 'cxScrollController as cxScrollController'
	        };
	    }
	])
	
	/**********************************************************
	 *
	 * @ngdoc controller
	 * @name cxBindScrollController
	 *
	 **********************************************************/
	
	.controller('cxScrollController', [
	    '$element',
	    '$attrs',
	    'cxScrollService',
	    function cxBindScrollController($element, $attrs, cxScrollService) {
	        
	        var _restrictToX = (this.ioScrollRestrictToAxis === 'x'),
	            _restrictToY = (this.ioScrollRestrictToAxis === 'y'),
	            _snapCoords = this.ioSnapCoords,
	            _cxScrollTop,
	            _cxScrollLeft,
	            _bindingId = $attrs.cxBindScroll;
	
	        if (_restrictToX) {
	            _cxScrollTop = false;
	            _cxScrollLeft = true;
	        }
	
	        // Y is the priority if both are sspecified
	        if (_restrictToY) {
	            _cxScrollTop = true;
	            _cxScrollLeft = false;
	        }
	
	        cxScrollService.bind(_bindingId, $element, _cxScrollTop, _cxScrollLeft, _snapCoords);
	    }
	])
	
	/**********************************************************
	 *
	 * @ngdoc service
	 * @name cxScrollService
	 *
	 **********************************************************/
	
	.service('cxScrollService', [
	    '$timeout',
	    function cxScrollService($timeout) {
	        
	
	        var _scrollBindings = {},
	            _endScrollTimeout,
	            _isSnapping = false;
	
	        this.bind = bind;
	
	        function bind(bindingId, $element, cxScrollTop, cxScrollLeft, snapCoords) {
	            if (!_scrollBindings[bindingId]) {
	                _scrollBindings[bindingId] = new ScrollBinding();
	            }
	            _scrollBindings[bindingId].addElement($element, cxScrollTop, cxScrollLeft, snapCoords);
	        }
	
	        function ScrollBinding() {
	            var _elements = [],
	                _$element,
	                _snapElement,
	                _snapCoords;
	
	            this.addElement = addElement;
	
	            function addElement($element, scrollTop, scrollLeft, snapCoords) {
	                var _element = $element[0];
	
	                _$element = $element;
	
	                _element.cxScrollService = {
	                    scrollTop: (angular.isDefined(scrollTop)) ? scrollTop : true,
	                    scrollLeft: (angular.isDefined(scrollLeft)) ? scrollLeft : true,
	                };
	
	                if (snapCoords) {
	                    _snapCoords = snapCoords;
	                    _snapElement = _element;
	                }
	
	                _elements.push(_element);
	                _cxBindScrollEvent();
	            }
	
	            function _cxBindScrollEvent() {
	                _$element.on('scroll', _scrollHandler);
	            }
	
	            function _cxUnbindScrollEvent() {
	                _$element.off('scroll', _scrollHandler);
	            }
	
	            function _scrollHandler(event) {
	                _resetEndScrollTimeout();
	                _scrollElements(event.target);
	            }
	
	            function _scrollElements(target) {
	                for (var ix = 0; ix < _elements.length; ix++) {
	                    _scrollElementByTarget(_elements[ix], target);
	                }
	            }
	
	            function _scrollElementByTarget(element, target) {
	                if (element.cxScrollService.scrollTop && target.cxScrollService.scrollTop) {
	                    element.scrollTop = target.scrollTop;
	                }
	                if (element.cxScrollService.scrollLeft && target.cxScrollService.scrollLeft) {
	                    element.scrollLeft = target.scrollLeft;
	                }
	            }
	
	            function _resetEndScrollTimeout() {
	                $timeout.cancel(_endScrollTimeout);
	                _endScrollTimeout = $timeout(_endScrollHandler, 100);
	            }
	
	            function _endScrollHandler() {
	                //_snap();
	            }
	
	            function _snap() {
	                _cxUnbindScrollEvent();
	                _snapElement.scrollTop = _getSnap(_snapCoords.y, _snapElement.scrollTop);
	                _snapElement.scrollLeft = _getSnap(_snapCoords.x, _snapElement.scrollLeft);
	                _scrollElements(_snapElement);
	                $timeout(_cxBindScrollEvent);
	            }
	
	            function _getSnap(axis, currentValue) {
	                for (var ix = 0; ix < axis.length; ix++) {
	                    if (axis[ix] === currentValue) {
	                        return currentValue;
	                    }
	                    if (axis[ix] > currentValue) {
	                        return _getSnapValue(axis[ix - 1], axis[ix], currentValue);
	                    }
	                }
	                return axis[axis.length - 1];
	            }
	
	            function _getSnapValue(low, high, value) {
	                var middle = (high - low) / 2;
	                return (value < middle) ? low : high;
	            }
	
	        }
	    }
	])
	
	
	/**********************************************************/
	;
	
	angular.module('ng.cx.grid.grid', [
	    'ng.cx.grid.cxScroll',
	    'ng.cx.grid.CxGrid'
	])
	
	/**********************************************************
	 *
	 * @ngdoc directive
	 * @name ngCxGrid
	 * @module ng.cx.grid
	 *
	 **********************************************************/
	
	.directive('cxGrid', [
	
	    function() {
	        
	
	        return {
	            restrict: 'AE',
	            replace: 'element',
	            templateUrl: 'src/grid/ng.cx.grid.html',
	            controller: 'cxGridController as gridController',
	            scope: {},
	            bindToController: {
	                ioDataProvider: '=?',
	                ioRowHeaderDataProvider: '=?',
	                ioColumnHeaderDataProvider: '=?',
	                ioCellRenderer: '@?',
	                ioRowHeaderRenderer: '@?',
	                ioColumnHeaderRenderer: '@?',
	                ioCornerRenderer: '@?'
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
	
	.controller('cxGridController', [
	    '$scope',
	    '$timeout',
	    '$element',
	    'CxGrid',
	    function ngCxGridController($scope, $timeout, $element, CxGrid) {
	        
	
	        var _grid,
	            _$rowHeadersContainer,
	            _$colHeadersContainer,
	            _$cellsContainer,
	            _$cornerContainer;
	
	        _$rowHeadersContainer = get$elementBySelector('.cx-grid-rh-container');
	        _$colHeadersContainer = get$elementBySelector('.cx-grid-ch-container');
	        _$cellsContainer      = get$elementBySelector('.cx-grid-cells-container');
	        _$cornerContainer     = get$elementBySelector('.cx-grid-corner-container');
	
	        _grid = new CxGrid(
	            this.ioDataProvider,
	            this.ioColumnHeaderDataProvider,
	            this.ioRowHeaderDataProvider,
	            this.ioCellRenderer,
	            this.ioColumnHeaderRenderer,
	            this.ioRowHeaderRenderer,
	            this.ioCornerRenderer,
	            $element,
	            _$colHeadersContainer,
	            _$rowHeadersContainer,
	            _$cellsContainer,
	            _$cornerContainer
	        );
	
	        window.cxGrid = _grid;
	
	        function get$elementBySelector(selector) {
	            return angular.element($element[0].querySelector(selector));
	        }
	    }
	])
	
	/**********************************************************/
	;
	
	/**********************************************************
	 *
	 * @ngdoc module
	 * @name ng.cx.grid
	 * @module ng.cx.grid
	 * @description provides a way to dropdown a transcluded content
	 *
	 **********************************************************/
	
	angular.module('ng.cx.grid', [
	    'ng.cx.grid.grid'
	])
	
	/**********************************************************/
	;
	
	angular.module('ng.cx.grid').run(['$templateCache', function($templateCache) {
	  
	
	  $templateCache.put('src/grid/ng.cx.grid.html',
	    "<div class=ng-cx-grid><div class=cx-grid-header><div class=cx-grid-corner-container></div><div class=cx-grid-ch-container cx-scroll=gridScroll io-scroll-restrict-to-axis=x></div></div><div class=cx-grid-body><div class=cx-grid-rh-container cx-scroll=gridScroll io-scroll-restrict-to-axis=y></div><div class=cx-grid-cells-container cx-scroll=gridScroll></div></div></div>"
	  );
	
	}]);
	

}(angular));