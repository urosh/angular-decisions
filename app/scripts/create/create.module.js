(function(){
	"use strict";

	angular.module('buildDecisions', []);

	angular
		.module('buildDecisions')
	  .directive('starcDecisionTree', decisionTreeDirective);
	  
	/* @ngInject */
	function decisionTreeDirective () {
	  // Usage:
	  //
	  // Creates:
	  //
	  var directive = {
	    controller: DecisionTreeController,
	    restrict: 'E',
	    controllerAs: 'vm',
	    link: link,
	    scope: {
	    },
	    templateUrl: 'scripts/create/decision.tree.tmpl.html'
	  };
	  return directive;
	  function link(scope, element, attrs) {
	  	console.log('ok we are in link function');
	  }
	}
	/* @ngInject */
	function DecisionTreeController () {
		var vm = this;

		vm.nodes = [
			{'node' : 'first', 'style': {top: '40px', left: '220px'}},
			{'node' : 'second', 'style': {top: '20px', left: '120px'}}
		]
		console.log('ok we are in a controller');
	}
	
})();