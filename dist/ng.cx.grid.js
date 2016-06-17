(function (angular) {
	'use strict';

	/**********************************************************
	 * 
	 * ng.cx.grid - v0.1.24
	 * 
	 * Release date : 2016-06-17 : 15:52
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
	            colHeaderRenderer,
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
	                _cornerCell,
	                _dataMatrix = dataProvider,
	                _viewMatrix,
	                _lastSelectedAxis = [];
	
	            /**********************************************************
	             * PROPERTIES
	             **********************************************************/
	
	            Object.defineProperty(this, 'width', {
	                get: function() {
	                    return _viewMatrix.width;
	                }
	            });
	
	            Object.defineProperty(this, 'height', {
	                get: function() {
	                    return _viewMatrix.height;
	                }
	            });
	
	            /**********************************************************
	             * METHODS
	             **********************************************************/
	
	
	            /**********************************************************
	             * CONSTRUCTOR
	             **********************************************************/
	
	            _init();
	
	            function _init() {
	
	                _hideMainContainer();
	
	                _dataMatrix.onRowAdded(onRowAddedHandler);
	                _dataMatrix.onColAdded(onColAddedHandler);
	
	                _viewMatrix = _dataMatrix.map(_createRowHeader, _createColHeader, _createCell);
	
	                _renderHeaders();
	                _renderCorner();
	
	                $timeout(function() {
	                    _resizeCorner();
	                    _renderAllCells();
	                    _showMainContainer();
	                });
	            }
	
	            /**********************************************************
	             * ACCESSORS
	             **********************************************************/
	
	            /**********************************************************
	             * METHOD IMPLEMENTATION
	             **********************************************************/
	
	
	            /**********************************************************
	             * HANDLERS
	             **********************************************************/
	
	            function onColHeaderClicked(event, header) {
	                _highlightAxis(_viewMatrix.getAxisByHeader(header));
	            }
	
	            function onRowHeaderClicked(event, header) {
	                _highlightAxis(_viewMatrix.getAxisByHeader(header));
	            }
	
	            function onColAddedHandler(index, header, cells) {
	                var headerCell = _createColHeader(header),
	                    cxCells = cells.map(_createCell);
	
	                _viewMatrix.addColAt(index, headerCell, cxCells);
	
	                if (index === 0) {
	                    $colHeadersContainer.prepend(headerCell.$element);
	                } else {
	                    _viewMatrix.getColHeaderAt(index - 1).$element.after(headerCell.$element);
	                }
	
	                $timeout(function() {
	                    _viewMatrix.mapColHeaders(_resetCellPosition);
	                    _viewMatrix.mapCells(_renderCell);
	                    _resizeCorner();
	                });
	
	
	            }
	
	            function onRowAddedHandler(index, header, cells) {
	                var headerCell = _createRowHeader(header),
	                    cxCells = cells.map(_createCell);
	
	                _viewMatrix.addRowAt(index, headerCell, cxCells);
	
	                if (index === 0) {
	                    $rowHeadersContainer.prepend(headerCell.$element);
	                } else {
	                    _viewMatrix.getRowHeaderAt(index - 1).$element.after(headerCell.$element);
	                }
	
	                $timeout(function() {
	                    _viewMatrix.mapRowHeaders(_resetCellPosition);
	                    _viewMatrix.mapCells(_renderCell);
	                    _resizeCorner();
	                });
	            }
	
	            /**********************************************************
	             * HELPERS
	             **********************************************************/
	
	
	            // Create -------------------------------------------------
	
	            function _createColHeader(item, index) {
	                var cell = _createCxCell(item, colHeaderRenderer, gridScope);
	                cell.on('click', onColHeaderClicked);
	                return cell;
	            }
	
	            function _createRowHeader(item, index) {
	                var cell = _createCxCell(item, rowHeaderRenderer, gridScope);
	                cell.on('click', onRowHeaderClicked);
	                return cell;
	            }
	
	            function _createCell(item, col, row) {
	                return _createCxCell(item, cellRenderer, gridScope);
	            }
	
	
	
	
	
	            // Render -------------------------------------------------
	
	            function _renderColHeader(header, index) {
	                $colHeadersContainer.append(header.$element);
	            }
	
	            function _renderRowHeader(header, index) {
	                $rowHeadersContainer.append(header.$element);
	            }
	
	            function _renderCell(cell, rowIndex, colIndex) {
	
	                if (cell) {
	                    cell.positionByHeaders(
	                        _viewMatrix.getRowHeaderAt(rowIndex),
	                        _viewMatrix.getColHeaderAt(colIndex)
	                    );
	
	                    $cellsContainer.append(cell.$element);
	                }
	            }
	
	            function _resetCellPosition(cell) {
	                cell.position();
	            }
	
	            // Initial Render ----------------------------------------
	
	            function _renderHeaders() {
	                _viewMatrix.map(_renderRowHeader, _renderColHeader);
	            }
	
	            function _renderCorner() {
	                _cornerCell = _createCxCell(undefined, cornerRenderer, gridScope);
	                $cornerContainer.append(_cornerCell.$element);
	            }
	
	            function _resizeCorner() {
	
	                var height = _getMaxMeasure(_viewMatrix.colHeaders, 'height'),
	                    width = _getMaxMeasure(_viewMatrix.rowHeaders, 'width');
	
	                _cornerCell.resize(width, height);
	            }
	
	            function _renderAllCells() {
	                _viewMatrix.mapCells(_renderCell);
	            }
	
	
	
	
	            // Hide / Show --------------------------------------------
	
	            function _hideMainContainer() {
	                $mainContainer.css('opacity', 0);
	            }
	
	            function _showMainContainer() {
	                $mainContainer.css('opacity', 1);
	                console.timeEnd('grid');
	            }
	
	            // Highlight ----------------------------------------------
	
	            function _highlightAxis(axis) {
	
	                _lastSelectedAxis.map(deSelectCell);
	
	                if (!isThePreviouslySelectedAxis(axis)) {
	                    axis.map(selectCell);
	                    _lastSelectedAxis = axis;
	                }
	
	                function selectCell(cell) {
	                    if (cell) {
	                        cell.select();
	                    }
	                }
	
	                function deSelectCell(cell) {
	                    if (cell) {
	                        cell.deSelect();
	                    }
	                }
	
	                function isThePreviouslySelectedAxis(axis) {
	                    return _lastSelectedAxis[0] === axis[0];
	                }
	            }
	
	
	        }
	
	        function _createCxCell(data, template, gridScope) {
	            return new CxCell(data, template, gridScope);
	        }
	
	        function _getMaxMeasure(elements, measure) {
	            var measures = elements.map(function(cell, index) {
	                return cell[measure];
	            });
	
	            return Math.max.apply(null, measures);
	        }
	    }
	])
	
	
	/**********************************************************/
	;
	
	angular.module('ng.cx.grid.CxGridMatrix', [
	    'ng.cx.grid.CxMatrix'
	])
	
	.factory('CxGridMatrix', [
	    'CxMatrix',
	    function $cxGridMatrixFactory(CxMatrix) {
	        
	
	        return CxGridMatrix;
	
	        /**********************************************************
	         *
	         * @ngdoc module
	         * @name ng.cx.grid.matrix
	         *
	         **********************************************************/
	
	        function CxGridMatrix(rowHeaders, colHeaders, cells) {
	
	            var _self = this,
	                _rowHeaders,
	                _colHeaders,
	                _cells,
	                _handlers = {
	                    onRowAdded: [],
	                    onColAdded: []
	                };
	
	            /**********************************************************
	             * PROPERTIES
	             **********************************************************/
	
	            Object.defineProperty(this, 'width', {
	                get: getWidth
	            });
	
	            Object.defineProperty(this, 'height', {
	                get: getHeight
	            });
	
	            Object.defineProperty(this, 'rowHeaders', {
	                get: getRowHeaders
	            });
	
	            Object.defineProperty(this, 'colHeaders', {
	                get: getColHeaders
	            });
	
	            Object.defineProperty(this, 'cells', {
	                get: getCells
	            });
	
	            /**********************************************************
	             * METHODS
	             **********************************************************/
	
	            this.getCellAt = getCellAt;
	            this.getColHeaderAt = getColHeaderAt;
	            this.getRowHeaderAt = getRowHeaderAt;
	
	            this.getColAt = getColAt;
	            this.getRowAt = getRowAt;
	
	            this.getAxisByHeader = getAxisByHeader;
	
	            this.addColAt = addColAt;
	            this.addRowAt = addRowAt;
	
	            this.getCopy = getCopy;
	
	            this.map = map;
	            this.mapColHeaders = mapColHeaders;
	            this.mapRowHeaders = mapRowHeaders;
	            this.mapCells = mapCells;
	
	            //@TODO: this is a super simplistic approach,
	            //this could be improved adding more event types
	            //but for now this is the simplest and easier way.
	            //
	            //@TODO: add deregister methods
	            this.onColAdded = onColAdded;
	            this.onRowAdded = onRowAdded;
	
	            /**********************************************************
	             * CONSTRUCTOR
	             **********************************************************/
	
	            _init(rowHeaders, colHeaders, cells);
	
	            function _init(rowHeaders, colHeaders, cells) {
	
	                _rowHeaders = Array.isArray(rowHeaders) ? rowHeaders.concat() : [];
	                _colHeaders = Array.isArray(colHeaders) ? colHeaders.concat() : [];
	
	                _cells = (cells instanceof CxMatrix) ? cells.getCopy() : new CxMatrix(cells);
	            }
	
	            /**********************************************************
	             * ACCESSORS
	             **********************************************************/
	
	            function getWidth() {
	                return _cells.width;
	            }
	
	            function getHeight() {
	                return _cells.height;
	            }
	
	            function getRowHeaders() {
	                return _rowHeaders;
	            }
	
	            function getColHeaders() {
	                return _colHeaders;
	            }
	
	            function getCells() {
	                return _cells;
	            }
	
	            /**********************************************************
	             * METHOD IMPLEMENTATION
	             **********************************************************/
	
	            function getCellAt(row, col) {
	
	                return _cells.getCellAt(row, col);
	            }
	
	            function getColHeaderAt(index) {
	
	                return _colHeaders[index];
	            }
	
	            function getRowHeaderAt(index) {
	
	                return _rowHeaders[index];
	            }
	
	            function getRowAt(index) {
	
	                return [_rowHeaders[index]].concat(_cells.getRowAt(index));
	            }
	
	            function getColAt(index) {
	
	                return [_colHeaders[index]].concat(_cells.getColAt(index));
	            }
	
	            function getAxisByHeader(header) {
	                var rowIndex = _rowHeaders.indexOf(header),
	                    colIndex = _colHeaders.indexOf(header);
	
	                if (rowIndex > -1) {
	                    return getRowAt(rowIndex);
	                }
	
	                if (colIndex > -1) {
	                    return getColAt(colIndex);
	                }
	
	
	                throw new Error('CxGridMatrix.getAxisByHeader error: the header provided is not present on any of the headers lists');
	            }
	
	            function addRowAt(index, header, cells) {
	
	                _rowHeaders.splice(index, 0, header);
	                _cells.addRowAt(index, cells);
	                _notifyHandlers('onRowAdded', index, header, cells);
	            }
	
	            function addColAt(index, header, cells) {
	                _colHeaders.splice(index, 0, header);
	                _cells.addColAt(index, cells);
	                _notifyHandlers('onColAdded', index, header, cells);
	            }
	
	
	            function getCopy() {
	                return new CxGridMatrix(_rowHeaders, _colHeaders, _cells);
	            }
	
	            function map(mapRowHeaderFn, mapColHeaderFn, mapCellsFn) {
	
	                var rowHeaders = (typeof mapRowHeaderFn === 'function') ? mapRowHeaders(mapRowHeaderFn) : _rowHeaders,
	                    colHeaders = (typeof mapColHeaderFn === 'function') ? mapColHeaders(mapColHeaderFn) : _colHeaders,
	                    cells = (typeof mapCellsFn === 'function') ? mapCells(mapCellsFn) : _cells;
	
	                return new CxGridMatrix(rowHeaders, colHeaders, cells);
	            }
	
	            function mapRowHeaders(mapFn) {
	                return _rowHeaders.map(mapFn);
	            }
	
	            function mapColHeaders(mapFn) {
	                return _colHeaders.map(mapFn);
	            }
	
	            function mapCells(mapFn) {
	                return _cells.map(mapFn);
	            }
	
	            function onRowAdded(handler) {
	                _handlers.onRowAdded.push(handler);
	            }
	
	            function onColAdded(handler) {
	                _handlers.onColAdded.push(handler);
	            }
	
	
	
	            /**********************************************************
	             * HELPERS
	             **********************************************************/
	
	            function _notifyHandlers(handlerId, index, header, cells) {
	                _handlers[handlerId].map(function (handler) {
	                    handler.call(this, index, header, cells);
	                });
	            }
	        }
	    }
	]);
	
	angular.module('ng.cx.grid.CxMatrix', [])
	
	/**********************************************************
	 *
	 * @ngdoc component
	 * @name myComponent
	 *
	 **********************************************************/
	
	.factory('CxMatrix', [
	    function $cxMatrixFactory() {
	        
	
	
	        return CxMatrix;
	
	        /**
	         * PRECONDITIONS:
	         * 1.) if initialised with a matrix all rows and columns has to have the same length
	         **/
	
	        function CxMatrix(matrix) {
	
	            var _self = this,
	                _height = 0,
	                _width = 0,
	                _cells = [[]];
	
	            /**********************************************************
	             * PROPERTIES
	             **********************************************************/
	
	            Object.defineProperty(this, 'height', {
	                get: getHeight
	            });
	
	            Object.defineProperty(this, 'width', {
	                get: getWidth
	            });
	
	            /**********************************************************
	             * METHODS
	             **********************************************************/
	
	            this.getCellAt = getCellAt;
	
	            this.getColAt = getColAt;
	            this.getRowAt = getRowAt;
	
	            this.addRowAt = addRowAt;
	            this.addColAt = addColAt;
	
	            this.getCopy = getCopy;
	            this.map = map;
	
	            /**********************************************************
	             * CONSTRUCTOR
	             **********************************************************/
	
	            _init();
	
	            function _init() {
	
	                if (Array.isArray(matrix) && Array.isArray(matrix[0])) {
	
	                    _cells = matrix.map(function(row) {
	                        return Array.isArray(row) ? row.concat() : [];
	                    }).concat();
	
	                    _setInitialDimensions();
	                }
	            }
	
	            /**********************************************************
	             * ACCESSORS
	             **********************************************************/
	
	            function getHeight() {
	                return _height;
	            }
	
	            function getWidth() {
	                return _width;
	            }
	
	            /**********************************************************
	             * METHOD IMPLEMENTATION
	             **********************************************************/
	
	            function getCellAt(row, col) {
	
	                return _cells[row][col];
	            }
	
	            function getColAt(index) {
	                var col = [];
	
	                for (var row = 0; row < _self.height; row++) {
	                    col.push(_cells[row][index]);
	                }
	
	                return col;
	
	            }
	
	            function getRowAt(index) {
	
	                return _cells[index];
	            }
	
	            function addColAt(index, cells) {
	                for (var row = 0; row < _self.height; row++) {
	                    _cells[row].splice(index, 0, cells[row]);
	                }
	                _width++;
	            }
	
	            function addRowAt(index, cells) {
	
	                _cells.splice(index, 0, cells);
	                _height++;
	            }
	
	            function getCopy() {
	                return new CxMatrix(_cells);
	            }
	
	            function map(callback) {
	
	                var cells = _cells.map(function(row, rowIndex) {
	                    return row.map(function(item, colIndex) {
	
	                        return callback.call(this, item, rowIndex, colIndex, _self);
	                    });
	                });
	
	                return new CxMatrix(cells);
	            }
	
	
	            /**********************************************************
	             * HELPERS
	             **********************************************************/
	
	            function _setInitialDimensions() {
	                _width = _cells[0].length;
	                _height = _cells.length;
	            }
	
	        }
	    }
	]);
	
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
	        this.addColAt = addColAt;
	
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
	
	        function addColAt(index, header, cells) {
	            _currentGrid.addColAt(index, header, cells);
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
	
	angular.module('ng.cx.grid').run(['$templateCache', function($templateCache) {
	  
	
	  $templateCache.put('src/grid/ng.cx.grid.html',
	    "<div class=ng-cx-grid><div class=cx-grid-header><div class=cx-grid-corner-container></div><div class=cx-grid-ch-container cx-scroll=gridScroll io-scroll-restrict-to-axis=x></div></div><div class=cx-grid-body><div class=cx-grid-rh-container cx-scroll=gridScroll io-scroll-restrict-to-axis=y></div><div class=cx-grid-cells-container cx-scroll=gridScroll io-scroll-on-scroll=gridController.scrollHandler></div></div></div>"
	  );
	
	}]);
	

}(angular));