(function (angular) {
	'use strict';

	/**********************************************************
	 * 
	 * ng.cx.grid - v0.0.2
	 * 
	 * Release date : 2016-01-15 : 15:05
	 * Author       : Jaime Beneytez - EF CTX 
	 * License      : MIT 
	 * 
	 **********************************************************/
	
	
	
	/**********************************************************
	 *
	 * @ngdoc module
	 * @name ng.cx.grid
	 * @module ng.cx.grid
	 * @description provides a way to dropdown a transcluded content
	 *
	 **********************************************************/
	
	angular.module('ng.cx.grid', [])
	
	/**********************************************************/
	;
	
	angular.module('ng.cx.grid')
	
	/**********************************************************
	 *
	 * @ngdoc directive
	 * @name ngCxGrid
	 * @module ng.cx.grid
	 *
	 **********************************************************/
	
	.directive('ngCxGrid', [
	    function() {
	        
	
	        return {
	            restrict: 'AE',
	            templateUrl: 'src/ng.cx.grid.tpl.html',
	            controller: 'ngCxGridController as gridController',
	            scope: {},
	            bindToController: {
	                ioDataProvider: '=?',
	                ioRowHeadersDataProvider: '=?',
	                ioColumnsheadersDataProvider: '=?',
	                ioCellItemRenderer: '@?',
	                ioRowHeaderItemRenderer: '@?',
	                ioColumnHeaderItemRenderer: '@?',
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
	
	.controller('ngCxGridController', [
	
	    function ngCxGridController() {
	        
	
	        console.log('WORK');
	
	    }
	])
	
	/**********************************************************/
	
	;
	
	angular.module('ng.cx.grid').run(['$templateCache', function($templateCache) {
	  
	
	  $templateCache.put('src/ng.cx.grid.tpl.html',
	    "<div class=ng-cx-grid><div class=corner></div><div class=row-headers><div class=row-header-cell ng-repeat=\"data in rowHeaderData\"></div></div><div class=column-headers><div class=column-header-cell ng-repeat=\"data in columnHeaderData\"></div></div><div class=grid><div class=grid-row ng-repeat=\"cells in gridData\"><div class=cell ng-repeat=\"cell in cells\">{{ cell }}</div></div></div></div>"
	  );
	
	}]);
	

}(angular));