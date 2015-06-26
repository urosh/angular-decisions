(function(){
	"use strict";

	angular
		.module('app.buildDecisions')
	  .directive('createDecisions', directive);
	  
	/* @ngInject */
	function directive (communicationChannel) {
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
	function Controller (communicationChannel, $mdDialog) {
		var vm = this;
		vm.startNewDocument = startNewDocument;
		vm.addNewNode = addNewNode;
		vm.removeNode = removeNode;
		vm.deleteDocument = deleteDocument;
		vm.editNode = editNode;
		vm.previewNode = previewNode;

		function DialogController($scope, $mdDialog) {
		  $scope.answer = function(answer) {
		    $mdDialog.hide(answer);
		  };

		  $scope.submitForm = function() {
		  	console.log($scope.documentForm.$valid);
		  	
		  }


		}
		function startNewDocument(ev) {
			// open modal window for creating a document
			$mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'scripts/create/newDocument.dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	    })
	    .then(function(answer) {
	      console.log('ok we are good now');
	      //$scope.alert = 'You said the information was "' + answer + '".';
	    }, function() {
	      //$scope.alert = 'You cancelled the dialog.';
	    });
		};

		function addNewNode() {
			communicationChannel.addNode();
		};

		function removeNode() {

		};

		function deleteDocument() {

		};

		function editNode() {

		};

		function previewNode() {

		};

		function editConnection() {

		};

		function previewConnection() {

		}
	}
	
})();