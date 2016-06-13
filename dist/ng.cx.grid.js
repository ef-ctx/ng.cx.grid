(function (angular) {
	'use strict';

	/**********************************************************
	 * 
	 * ng.cx.grid - v0.1.16
	 * 
	 * Release date : 2016-06-13 : 23:01
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
	            dataProvider,
	            cellRenderer,
	            columnHeaderRenderer,
	            rowHeaderRenderer,
	            cornerRenderer,
	            $mainContainer,
	            $colHeadersContainer,
	            $rowHeadersContainer,
	            $cellsContainer,
	            $cornerContainer,
	            gridScope
	        ) {
	
	            var self = this,
	                _rowHeaders = [],
	                _colHeaders = [],
	                _cells = [
	                    []
	                ];
	
	            Object.defineProperty(this, 'width', {
	                get: function () {
	                    return _colHeaders.length;
	                }
	            });
	
	            Object.defineProperty(this, 'height', {
	                get: function () {
	                    return _rowHeaders.length;
	                }
	            });
	
	            this.addColumnAt = addColumnAt;
	            this.addRowAt = addRowAt;
	            this.getCell = getCell;
	
	            /**********************************************************
	             * IMPLEMENTATION
	             **********************************************************/
	
	            _init();
	
	            /**********************************************************
	             * METHODS
	             **********************************************************/
	
	            function getCell(row, column) {
	                return _cells[row][column];
	            }
	
	            function addColumnAt(index, header, cells) {
	                _addHeaderAtIndex(index, header, columnHeaderRenderer, _colHeaders, $colHeadersContainer);
	                $timeout(function () {
	                    _addCellsColumnAt(index, cells, cellRenderer, $cellsContainer);
	                });
	            }
	
	            function addRowAt(index, header, cells) {
	                _addHeaderAtIndex(index, header, rowHeaderRenderer, _rowHeaders, $rowHeadersContainer);
	                $timeout(function () {
	                    _addCellsRowAt(index, cells, cellRenderer, $cellsContainer);
	                });
	            }
	
	            function _addCellsRowAt(index, cells, template, $container) {
	                var cell,
	                    cellsRow = [];
	
	                for (var ix = 0; ix < self.width; ix++) {
	                    cell = _createCell(cells[ix], template, gridScope, _rowHeaders[index], _colHeaders[ix]);
	                    cellsRow[ix] = cell;
	                    cell.position();
	                    $container.append(cell.$element);
	                }
	
	                _cells.splice(index, 0, cellsRow);
	                $timeout(_repositionCells(index + 1, 0));
	            }
	
	            function _addCellsColumnAt(index, cells, template, $container) {
	                var cell;
	
	                for (var ix = 0; ix < self.height; ix++) {
	                    cell = _createCell(cells[ix], template, gridScope, _rowHeaders[ix], _colHeaders[index]);
	                    _cells[ix].splice(index, 0, cell);
	                    cell.position();
	                    $container.append(cell.$element);
	                }
	
	                $timeout(_repositionCells(0, index + 1));
	            }
	
	            function _repositionCells(initialRow, initialColumn) {
	                initialRow = initialRow || 0;
	                initialColumn = initialColumn || 0;
	
	                for (var row = 0; row < self.height; row++) {
	                    _rowHeaders[row].position();
	                    for (var col = 0; col < self.width; col++) {
	                        _colHeaders[col].position();
	                        _cells[row][col].position();
	                        _cells[row][col].resize();
	                    }
	                }
	            }
	
	            function headerClickedHandler(event, header) {
	                console.log('event', event);
	                console.log('header', header);
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
	                console.timeEnd('grid');
	            }
	
	            // HEADERS -------------------------------------------------
	
	            function _renderHeaders() {
	
	                dataProvider.colHeaders.map(_createColHeaderCell);
	                dataProvider.rowHeaders.map(_createRowHeaderCell);
	            }
	
	            function _createColHeaderCell(data) {
	                _addHeaderAtIndex(null, data, columnHeaderRenderer, _colHeaders, $colHeadersContainer);
	            }
	
	            function _createRowHeaderCell(data) {
	                _addHeaderAtIndex(null, data, rowHeaderRenderer, _rowHeaders, $rowHeadersContainer);
	            }
	
	            function _addHeaderAtIndex(index, data, renderer, collection, container) {
	
	                var cell = _createCell(data, renderer, gridScope, null, null, collection);
	
	                index = index || collection.length;
	
	                collection.splice(index, 0, cell);
	
	                if (index === 0) {
	
	                    container.prepend(cell.$element);
	
	                } else if (index === collection.length - 1) {
	
	                    container.append(cell.$element);
	
	                } else {
	
	                    collection[index - 1].$element.after(cell.$element);
	                    collection.map(function (item) {
	                        item.position();
	                    });
	                }
	
	                return cell;
	            }
	
	            // CORNER -------------------------------------------------
	
	            function _renderCorner() {
	                var width = _getMaxMeasure(_rowHeaders, 'width'),
	                    height = _getMaxMeasure(_colHeaders, 'height'),
	                    cell = _createCell(undefined, cornerRenderer, gridScope);
	
	                cell.resize(width, height);
	                $cornerContainer.append(cell.$element);
	            }
	
	            // GRID -------------------------------------------------
	
	            function _renderGrid() {
	
	                for (var row = 0; row < _rowHeaders.length; row++) {
	
	                    _cells[row] = [];
	
	                    for (var col = 0; col < _colHeaders.length; col++) {
	
	                        _cells[row][col] = _createGridCell(row, col);
	                    }
	                }
	            }
	
	            function _createGridCell(rowIndex, colIndex) {
	
	                var cellData = dataProvider.cells[rowIndex][colIndex],
	                    cell = _createCell(
	                    cellData,
	                    cellRenderer,
	                    gridScope,
	                    _rowHeaders[rowIndex],
	                    _colHeaders[colIndex]
	                );
	
	                $cellsContainer.append(cell.$element);
	
	                return cell;
	            }
	
	        }
	
	        function _createCell(data, template, gridScope, rowHeader, colHeader, collection) {
	            return new CxCell(data, template, gridScope, rowHeader, colHeader, collection);
	        }
	
	        function _getMaxMeasure(elements, measure) {
	            var measures = elements.map(function(cell) {
	                return cell[measure];
	            });
	
	            return Math.max.apply(null, measures);
	        }
	
	    }
	])
	
	
	/**********************************************************/
	;
	
	(function(angular) {
	    
	
	    /**********************************************************
	     *
	     * @ngdoc module
	     * @name ng.cx.grid.matrix
	     *
	     **********************************************************/
	
	    angular
	        .module('ng.cx.grid.CxMatrix', [])
	        .factory('CxMatrix', [ function $cxMatrixFactory() { return CxMatrix; } ]);
	
	    /**********************************************************
	     *
	     * @ngdoc module
	     * @name ng.cx.grid.matrix
	     *
	     **********************************************************/
	
	    function CxMatrix(colHeaders, rowHeaders, cells, factory) {
	
	        //console.log(
	            //'factory',
	            //colHeaders,
	            //rowHeaders,
	            //cells,
	            //factory);
	
	        var _self       = this,
	            _colHeaders = colHeaders || [],
	            _rowHeaders = rowHeaders || [],
	            _cells      = cells      || [];
	
	        _init();
	
	        Object.defineProperty(this, 'width', {
	            get: function () {
	                return _colHeaders.length;
	            }
	        });
	
	        Object.defineProperty(this, 'height', {
	            get: function () {
	                return _rowHeaders.length;
	            }
	        });
	
	        this.getCellAt  = getCellAt;
	        this.getRowHeaderAt = getRowHeaderAt;
	        this.getColHeaderAt = getColHeaderAt;
	
	        this.getColAt = getColAt;
	        this.getRowAt = getRowAt;
	
	        this.addRowAt = addRowAt;
	        this.addColAt = addColAt;
	
	        function getCellAt(col, row) {
	            return _cells[col][row];
	        }
	
	        function getRowHeaderAt(index) {
	            return _rowHeaders[index];
	        }
	
	        function getColHeaderAt(index) {
	            return _colHeaders[index];
	        }
	
	        function getColAt(index) {
	
	            var col = [];
	            col.push(_colHeaders[index]);
	
	            return col.concat(_cells[index]);
	        }
	
	        function getRowAt(index) {
	
	            var row = [];
	            row.push(_rowHeaders[index]);
	
	            for(var col = 0; col < _rowHeaders.length; col++) {
	                row.push(_cells[col][index]);
	            }
	
	            return row;
	        }
	
	        function addRowAt(index, header, cell){
	
	        }
	
	        function addColAt(index, header, cell){
	
	        }
	
	        function _init() {
	
	            if(typeof constructor === 'function') {
	                _colHeaders = colHeaders.map(factory.createInstance);
	                _rowHeaders = rowHeaders.map(factory.createInstance);
	                _cells = cells.map(function (col) {
	                    return col.map(factory.createInstance);
	                });
	            }
	        }
	
	    }
	
	}(angular));
	
	/**********************************************************
	 *
	 * @ngdoc module
	 * @name ng.cx.grid.cxGridService
	 *
	 **********************************************************/
	
	angular.module('ng.cx.grid.cxGridService',[])
	
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
	        this.addRowAt = addRowAt;
	        this.addColumnAt = addColumnAt;
	
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
	
	        function addRowAt(index, header, cells) {
	            _currentGrid.addRowAt(index, header, cells);
	        }
	
	        function addColumnAt(index, header, cells) {
	            _currentGrid.addColumnAt(index, header, cells);
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
	    'ng.cx.grid.CxGrid',
	    'ng.cx.grid.cxGridService'
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
	                ioCellRenderer: '@?',
	                ioRowHeaderRenderer: '@?',
	                ioColumnHeaderRenderer: '@?',
	                ioCornerRenderer: '@?'
	            }
	        };
	    }
	])
	
	.controller('cxGridController', [
	    '$scope',
	    '$element',
	    'CxGrid',
	    'cxGridService',
	    function ngCxGridController($scope, $element, CxGrid, cxGridService) {
	        
	
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
	            this.ioCellRenderer,
	            this.ioColumnHeaderRenderer,
	            this.ioRowHeaderRenderer,
	            this.ioCornerRenderer,
	            $element,
	            _$colHeadersContainer,
	            _$rowHeadersContainer,
	            _$cellsContainer,
	            _$cornerContainer,
	            $scope
	        );
	
	        window.cxGrid = _grid;
	
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
	
	(function(angular) {
	
	    
	
	    angular
	        .module('gridData', [])
	        .factory('GridData', [GridDataFactory]);
	
	    function GridDataFactory() {
	        return GridData;
	    }
	
	    function GridData(rows, columns) {
	
	        var _colHeaders = [],
	            _rowHeaders = [],
	            _cells = [];
	
	        this.addRowAt = addRowAt;
	        this.addColumnAt = addColumnAt;
	
	        Object.defineProperty(this, 'rowHeaders', {
	            get: function () {
	                return _rowHeaders;
	            }
	        });
	
	        Object.defineProperty(this, 'colHeaders', {
	            get: function () {
	                return _colHeaders;
	            }
	        });
	
	        Object.defineProperty(this, 'cells', {
	            get: function () {
	                return _cells;
	            }
	        });
	
	        function addRowAt(index, header, cells) {
	            _addRowHeaderAt(index, header);
	            _addCellsRowAt(index, cells);
	        }
	
	        function addColumnAt(index, header, cells) {
	            _addColHeaderAt(index, header);
	            _addCellsColumnAt(index, cells);
	        }
	
	        _init();
	
	        function _init() {
	
	            for (var row = 0; row < columns; row++) {
	                _rowHeaders.push(rowHeaderParser(row, col, columns));
	                _cells.push([]);
	                for (var col = 0; col < rows; col++) {
	                    if (row === 0) {
	                        _colHeaders.push(colHeaderParser(row, col, rows));
	                    }
	                    _cells[row].push(itemParser(row, col));
	                }
	            }
	        }
	
	        // Add Row Helpers
	        function _addRowHeaderAt(index, header) {
	            _rowHeaders.splice(index, 0, header);
	        }
	
	        function _addCellsRowAt(index, cells) {
	            _cells.splice(index, 0, cells);
	        }
	
	        // Add Column Helpers
	        function _addColHeaderAt(index, header) {
	            _colHeaders.splice(index, 0, header);
	        }
	
	        function _addCellsColumnAt(index, cells) {
	            for (var ix = 0; ix < _cells.length; ix++) {
	                _cells[ix].splice(index, 0, cells[ix]);
	            }
	        }
	    }
	
	    function itemParser(row, col) {
	
	        return {
	            title: 'Closed answer',
	            label: row + '-' + col,
	            score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
	        };
	    }
	
	    function colHeaderParser(row, col, total) {
	
	        return {
	            label: col + 1,
	            count: col + 1,
	            total: total,
	            score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
	        };
	    }
	
	    function rowHeaderParser(row, col, total) {
	
	        return {
	            label: row + 1,
	            count: col + 1,
	            total: total,
	            score: (col !== 1) ? Math.floor(Math.random() * 10) % 5 : undefined
	        };
	    }
	
	
	}(angular));
	
	angular.module('ng.cx.grid').run(['$templateCache', function($templateCache) {
	  
	
	  $templateCache.put('src/grid/ng.cx.grid.html',
	    "<div class=ng-cx-grid><div class=cx-grid-header><div class=cx-grid-corner-container></div><div class=cx-grid-ch-container cx-scroll=gridScroll io-scroll-restrict-to-axis=x></div></div><div class=cx-grid-body><div class=cx-grid-rh-container cx-scroll=gridScroll io-scroll-restrict-to-axis=y></div><div class=cx-grid-cells-container cx-scroll=gridScroll io-scroll-on-scroll=gridController.scrollHandler></div></div></div>"
	  );
	
	}]);
	

}(angular));