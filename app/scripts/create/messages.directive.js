(function(){
	"use strict";

	angular
		.module('app.buildDecisions')
	  .directive('decisionLogs', directive);
	  
	/* @ngInject */
	function directive () {
	  // Usage:
	  //
	  // Creates:
	  //
	  var directive = {
	    controller: Controller,
	    controllerAs: 'vm',
	    link: link,
	    restrict: 'E',
	    scope: {
	    },
	    template: '<div layout-fill layout="column" class="inset"></div>'
	  };
	  return directive;
	  function link(scope, element, attrs) {
	  
	  }
	}
	/* @ngInject */
	function Controller (communicationChannel) {
		
	}
	
})();