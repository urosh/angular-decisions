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
	function Controller (communicationChannel, $mdDialog, decisionFactory) {
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

		  $scope.addNewDocument = function() {

		  	console.log($scope.documentForm.$valid);
		  	if($scope.documentForm.$valid) {
		  		console.log($scope.document)
		  		$mdDialog.hide($scope.document);
		  	}

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
	    .then(function(newDocument) {
	    	console.log('ok now we can save the document');
	      decisionFactory.newDocument(newDocument.title, newDocument.tags, newDocument.text);
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