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
	    template: '<div layout-fill layout="column" role="main" flex class="inset message-div"></div>'
	  };
	  return directive;
	  function link(scope, element, attrs) {
	  
	  }
	}
	/* @ngInject */
	function Controller ($scope, communicationChannel, $mdToast, $animate) {
		function ToastCtrl($scope) {
			$scope.closeToast = function() {
    		$mdToast.hide();
  		};
		}

		communicationChannel.onAddConnectionSelected($scope, function(event) {
			console.log('ok node is selected lets show the toast');
			$mdToast.show({
	      controller: ToastCtrl,
	      template: '<md-toast><span flex>Select a target node.</span></md-toast>',
	      hideDelay: 12000,
	      position: "top center"
	    });

		});

		communicationChannel.onDataSaved($scope, function(event) {
			$mdToast.show({
	      controller: ToastCtrl,
	      template: '<md-toast><span flex>Item(s) saved successfuly.</span></md-toast>',
	      hideDelay: 5000,
	      position: "top center"
	    });

		});




	}


	
})();