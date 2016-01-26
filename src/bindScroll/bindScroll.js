/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.grid.bindScroll
 *
 **********************************************************/

angular.module('ng.cx.grid.bindScroll', [])

/**********************************************************
 *
 * @ngdoc directive
 * @name cxBindScroll
 *
 **********************************************************/

.directive('cxBindScroll', [

    function cxBindScroll() {
        'use strict';

        return {
            restrict: 'AE',
            controller: 'cxBindScrollController as cxBindScrollController'
        };
    }
])

/**********************************************************
 *
 * @ngdoc controller
 * @name cxBindScrollController
 *
 **********************************************************/

.controller('cxBindScrollController', [
    '$element',
    '$attrs',
    'cxScrollService',
    function cxBindScrollController($element, $attrs, cxScrollService) {
        'use strict';
        var _restrictToX = ($attrs.ioBindScrollRestrictToAxis === 'x'),
            _restrictToY = ($attrs.ioBindScrollRestrictToAxis === 'y'),
            _bindScrollTop,
            _bindScrollLeft,
            _bindingId = $attrs.cxBindScroll;

        if (_restrictToX) {
            _bindScrollTop = false;
            _bindScrollLeft = true;
        }

        // Y is the priority if both are sspecified
        if (_restrictToY) {
            _bindScrollTop = true;
            _bindScrollLeft = false;
        }

        cxScrollService.bind(_bindingId, $element, _bindScrollTop, _bindScrollLeft);
    }
])

/**********************************************************
 *
 * @ngdoc service
 * @name cxScrollService
 *
 **********************************************************/

.service('cxScrollService', [

    function cxScrollService() {
        'use strict';

        var _scrollBindings = {};

        this.bind = bind;

        function bind(bindingId, $element, bindScrollTop, bindScrollLeft) {
            if (!_scrollBindings[bindingId]) {
                _scrollBindings[bindingId] = new ScrollBinding();
            }
            _scrollBindings[bindingId].addElement($element, bindScrollTop, bindScrollLeft);
        }

        function ScrollBinding() {
            var _elements = [];

            this.addElement = addElement;

            function addElement($element, scrollTop, scrollLeft) {
                var _element = $element[0];
                _element.cxScrollService = {
                    scrollTop: (angular.isDefined(scrollTop)) ? scrollTop : true,
                    scrollLeft: (angular.isDefined(scrollLeft)) ? scrollLeft : true,
                };

                _elements.push(_element);
                _bindScrollEvent($element);
            }

            function _bindScrollEvent($element) {
                $element.on('scroll', _scrollHandler);
            }

            function _scrollHandler(event) {
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

        }
    }
])


/**********************************************************/
;
