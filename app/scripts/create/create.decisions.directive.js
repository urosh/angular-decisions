(function(){
	"use strict";

	angular
		.module('app.buildDecisions')
	  .directive('createDecisions', directive);
	
	angular
		.module('app.buildDecisions')
		.controller('Controller', Controller);

	/* @ngInject */
	function directive (communicationChannel) {
	  var directive = {
	    controller: 'Controller',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
	    },
	    templateUrl: 'scripts/create/create.decisions.tmpl.html'
	  };
	  return directive;
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
		vm.removeConnection = removeConnection;
		vm.connectNode = connectNode;
		vm.addDataToNode = addDataToNode;
		vm.selectedConnection = '';
		vm.selectedNode = '';
		
		var _START_ = "_START_",
				_DOCUMENT_ = "_DOCUMENT_",
				_NODE_ = "_NODE_",
				_NODE_SOURCE_ = "_NODE_SOURCE_",
				_NODE_TARGET_ = "_NODE_TARGET_",
				_CONNECTION_ = "_CONNECTION_";

		vm.state = _START_;
		
		var nodeConnections = {
			'source': '',
			'target': ''
		};

		

		
		/* New document */
		function startNewDocument(ev) {
			decisionFactory.startNewDocument(ev).then(function(newDocument) {
				vm.currentDocument = newDocument;
	    	vm.state = _DOCUMENT_;
			})
		};
	
		/* Adding new node to the view */
		function addNewNode(ev) {
			if(vm.currentDocument) {
				decisionFactory.addNewNode(ev);
			}
		};

		/* Adding data to a node */
		function addDataToNode(ev) {
			decisionFactory.addDataToNode(ev).then(function(res){
				console.log('ok we are here now');
				console.log(res);
				communicationChannel.dataSaved();
			})
		}

		function editNode(ev) {
			decisionFactory.editNode(ev);
		};
		



		function removeNode() {

		};

		function deleteDocument() {

		};

		

		


		function previewNode() {

		};

		function editConnection() {

		};

		function previewConnection() {

		};

		function selectNode(id) {
			if(vm.state === "_DOCUMENT_" || vm.state === "_NODE_") {
				nodeConnections.source = id;
				vm.selectedNode = id;
				decisionFactory.selectedNode = id;
			}
			if(vm.state === "_NODE_TARGET_") {
				nodeConnections.target = id;
				vm.selectedNode = id;
				decisionFactory.selectedNode = id;
				communicationChannel.connectNodes(nodeConnections);
				vm.state = "_DOCUMENT_";

			}
			vm.state = "_NODE_";
			
		};

		function connectNode() {
			vm.state = "_NODE_TARGET_";
			communicationChannel.addConnectionSelected();
		}

		function unselectNode() {
			vm.state = "_DOCUMENT_";
			vm.selectedNode = '';
			decisionFactory.selectedNode = '';
		}

		function selectConnection() {
			if(vm.selectedConnection !== null) {
				vm.state = "_CONNECTION_";
				
			}else{
				vm.state = "_DOCUMENT_";
			}
			$scope.$apply();
			

		};

		function removeConnection() {
			console.log(vm.selectedConnection);
		}
	}
	
})();