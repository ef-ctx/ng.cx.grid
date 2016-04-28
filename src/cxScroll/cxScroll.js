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
        'use strict';

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
        'use strict';

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

        // Y is the priority if both are specified
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
        'use strict';

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
                //console.log('scroll', event.target.className, event.target.scrollTop, '-----------', event.target.scrollLeft );

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
