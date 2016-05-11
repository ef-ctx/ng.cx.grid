(function (angular) {
	'use strict';

	/**********************************************************
	 * 
	 * ng.cx.grid - v0.1.12
	 * 
	 * Release date : 2016-05-11 : 17:16
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
	                _isHighlighted = false,
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
	
	            this.toggleHighlight = toggleHighlight;
	            this.highlight = highlight;
	            this.unHighlight = unHighlight;
	
	            /**********************************************************
	             * RUN
	             **********************************************************/
	
	            _$element = _render(data, template, restrictions);
	
	            /**********************************************************
	             * METHODS
	             **********************************************************/
	
	            function highlight() {
	                _isHighlighted = true;
	                _$element.addClass(_highlightingClass);
	            }
	
	            function unHighlight() {
	                _isHighlighted = false;
	                _$element.removeClass(_highlightingClass);
	            }
	
	            function toggleHighlight() {
	                _isHighlighted = !_isHighlighted;
	                return (_isHighlighted) ? highlight() : unHighlight();
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
	
	            function toggleLineHighlighting(index, axis) {
	                var oppositeAxis = (axis === 'x') ? 'y' : 'x';
	
	                if (_highlighted[axis] && _highlighted[axis].index !== index) {
	
	                    if(_highlighted.x !== undefined) {
	                        _highlighted.x.unHighlight();
	                    }
	
	                    if(_highlighted.y !== undefined) {
	                        _highlighted.y.unHighlight();
	                    }
	                }
	
	                if(_highlighted[oppositeAxis]) {
	                    _highlighted[oppositeAxis].unHighlight();
	                }
	
	                _highlighted[axis] = (axis === 'x') ? _getRowByIndex(index) : _getColumnByIndex(index);
	
	                if(_highlighted[axis] !== undefined) {
	                    _highlighted[axis].toggleHighlight();
	                }
	
	            }
	
	            function highlightRow(index) {
	                toggleLineHighlighting(index, 'x');
	            }
	
	            function highlightColumn(index) {
	                toggleLineHighlighting(index, 'y');
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
	
	            this.highlight = highlight;
	            this.unHighlight = unHighlight;
	            this.toggleHighlight = toggleHighlight;
	
	            this.isEqual = isEqual;
	
	            function toggleHighlight() {
	                elements.map(function(element) {
	                    element.toggleHighlight();
	                });
	            }
	
	            function highlight() {
	                elements.map(function(element) {
	                    element.highlight();
	                });
	            }
	
	            function unHighlight() {
	                elements.map(function(element) {
	                    element.unHighlight();
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
	                ioSnapCoords: '=?',
	                ioScrollOnScroll: '=?'
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
	            _onScrollHandler = this.ioScrollOnScroll,
	            _bindingId = $attrs.cxBindScroll;
	
	        if (_restrictToX) {
	            _cxScrollTop = false;
	            _cxScrollLeft = true;
	        }
	
	        // Y is the priority if both are specified
	        if (_restrictToY) {
	            _cxScrollTop = true;
	            _cxScrollLeft = false;
	        }
	
	        cxScrollService.bind(_bindingId, $element, _cxScrollTop, _cxScrollLeft, _snapCoords, _onScrollHandler);
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
	        this.getScrollBindingById = getScrollBindingById;
	
	        function bind(bindingId, $element, cxScrollTop, cxScrollLeft, snapCoords, onScrollHandler) {
	            if (!_scrollBindings[bindingId]) {
	                _scrollBindings[bindingId] = new ScrollBinding();
	            }
	            _scrollBindings[bindingId].addElement($element, cxScrollTop, cxScrollLeft, snapCoords, onScrollHandler);
	        }
	
	        function getScrollBindingById(id) {
	            return _scrollBindings[id];
	        }
	
	
	        function ScrollBinding() {
	            var _elements = [],
	                _$element,
	                _snapElement,
	                _snapCoords,
	                _scrollHandlers = [];
	
	            this.addElement = addElement;
	
	            Object.defineProperty(this, '$element', {
	                get: function () {
	                    return _$element;
	                }
	            });
	
	            function addElement($element, scrollTop, scrollLeft, snapCoords, onScrollHandler) {
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
	
	                if (onScrollHandler) {
	                    _$element.on('scroll', onScrollHandler);
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
	
	.service('cxGridService',[
	    function cxGridService() {
	        
	
	        var _currentGrid;
	
	        this.addGrid = addGrid;
	        this.cleanCurrentGrid = cleanCurrentGrid;
	        this.highlightRow = highlightRow;
	        this.highlightColumn = highlightColumn;
	
	        function addGrid(grid) {
	            _currentGrid = grid;
	        }
	
	        function cleanCurrentGrid() {
	            _currentGrid = undefined;
	        }
	
	        function highlightRow(index) {
	            _currentGrid.highlightRow(index);
	        }
	
	        function highlightColumn(index) {
	            _currentGrid.highlightColumn(index);
	        }
	
	    }
	])
	
	.controller('cxGridController', [
	    '$scope',
	    '$timeout',
	    '$element',
	    'CxGrid',
	    'cxGridService',
	    function ngCxGridController($scope, $timeout, $element, CxGrid, cxGridService) {
	        
	
	        var _grid,
	            _$rowHeadersContainer,
	            _$colHeadersContainer,
	            _$cellsContainer,
	            _$cornerContainer,
	            _$element = $element;
	
	        this.scrollHandler = scrollHandler;
	
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
	
	        cxGridService.addGrid( _grid );
	
	        function scrollHandler(event) {
	
	            var scrollTop = event.target.scrollTop,
	                scrollLeft = event.target.scrollLeft;
	
	            if(scrollTop > 0){
	                _$element.addClass('is-scrolling-y');
	            } else {
	                _$element.removeClass('is-scrolling-y');
	            }
	
	            if(scrollLeft > 0){
	                _$element.addClass('is-scrolling-x');
	            } else {
	                _$element.removeClass('is-scrolling-x');
	            }
	        }
	
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
	    "<div class=ng-cx-grid><div class=cx-grid-header><div class=cx-grid-corner-container></div><div class=cx-grid-ch-container cx-scroll=gridScroll io-scroll-restrict-to-axis=x></div></div><div class=cx-grid-body><div class=cx-grid-rh-container cx-scroll=gridScroll io-scroll-restrict-to-axis=y></div><div class=cx-grid-cells-container cx-scroll=gridScroll io-scroll-on-scroll=gridController.scrollHandler></div></div></div>"
	  );
	
	}]);
	

}(angular));