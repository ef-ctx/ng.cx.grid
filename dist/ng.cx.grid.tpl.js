angular.module('ng.cx.grid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/grid/ng.cx.grid.html',
    "<div class=ng-cx-grid><div class=header><div class=corner></div><div class=column-headers cx-scroll=gridScroll io-scroll-restrict-to-axis=x></div></div><div class=body><div class=row-headers cx-scroll=gridScroll io-scroll-restrict-to-axis=y></div><div class=grid cx-scroll=gridScroll></div></div></div>"
  );

}]);
