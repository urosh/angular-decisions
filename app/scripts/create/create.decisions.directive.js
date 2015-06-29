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
	function Controller ($scope, communicationChannel, $mdDialog, decisionFactory) {
		var vm = this;
		vm.startNewDocument = startNewDocument;
		vm.addNewNode = addNewNode;
		vm.removeNode = removeNode;
		vm.deleteDocument = deleteDocument;
		vm.editNode = editNode;
		vm.previewNode = previewNode;
		
		

		vm.selectTab = function(i) {
			console.log('here?');
		}
		

		function DialogController($scope, $mdDialog) {
		  $scope.answer = function() {
		    $mdDialog.hide();
		  };

		  $scope.addNewDocument = function() {
		  	if($scope.documentForm.$valid) {
		  		$mdDialog.hide($scope.document);
		  	}
		  }

		}

		function NewNodeController($scope, $mdDialog) {
			$scope.close = function() {
				$mdDialog.hide();
			}

			$scope.addNewNode = function() {
				if($scope.documentForm.$valid) {
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
	    	if(newDocument !== undefined) {
		    	vm.currentDocument = decisionFactory.newDocument(newDocument.title, newDocument.tags, newDocument.text);
	    	}
	    });
		};

		function addNewNode(ev) {
			// open modal window for creating a document
			if(vm.currentDocument) {
				$mdDialog.show({
		      controller: NewNodeController,
		      templateUrl: 'scripts/create/newNode.dialog.tmpl.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		    })
		    .then(function(newDocument) {
		    	communicationChannel.addNode(newDocument);
		    });

			}

			
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