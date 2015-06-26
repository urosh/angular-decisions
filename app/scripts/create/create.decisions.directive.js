(function(){
	"use strict";

	angular
		.module('buildDecisions')
	  .directive('createDecisions', directive);
	  
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
	    templateUrl: 'scripts/create/create.decisions.tmpl.html'
	  };
	  return directive;
	  function link(scope, element, attrs) {
	  }
	}
	/* @ngInject */
	function Controller () {
	
	}
	
})();