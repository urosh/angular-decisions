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
		vm.selectNode = selectNode;
		vm.unselectNode = unselectNode;
		vm.selectConnection =  selectConnection;
		vm.connectNode = connectNode;
		var _START_ = "_START_",
				_DOCUMENT_ = "_DOCUMENT_",
				_NODE_ = "_NODE_",
				_NODE_SOURCE_ = "_NODE_SOURCE_",
				_NODE_TARGET_ = "_NODE_TARGET_",
				_CONNECTION_ = "_CONNECTION_";


		vm.state = _START_;

		

		

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
	    		communicationChannel.addDocument();
	    		vm.state = _DOCUMENT_;

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
		    	if(newDocument !== undefined){
			    	communicationChannel.addNode(newDocument);
		    		
		    	}
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

		};

		function selectNode() {
			if(vm.state === "_NODE_TARGET_") {
				console.log('ok this node is my target.');
			}
			vm.state = "_NODE_";
			

		};

		function connectNode() {
			console.log('ok now we will connect nodes, next node i select is target.')
			vm.state = "_NODE_TARGET_";
			communicationChannel.addConnectionSelected();
		}

		function unselectNode() {
			vm.state = "_DOCUMENT_";
		}

		function selectConnection() {
			console.log('connection selected');

		}
	}
	
})();