(function(){
	"use strict";

	angular
		.module('app.treeModule')
	  .directive('createDecisions', directive);
	
	angular
		.module('app.treeModule')
		.controller('Controller', Controller);

	
	/* @ngInject */
	function directive (communicationChannel) {
	  var directive = {
	    controller: 'Controller',
	    controllerAs: 'vm',
	    restrict: 'E',
	    scope: {
	    },
	    templateUrl: 'scripts/tree/createDecisionsTemplate.html'
	  };
	  return directive;
	}

	/* @ngInject */
	function Controller ($scope, communicationChannel, $mdDialog, decisionFactory, treeActions, dialogService, appStates, storyMessages) {
		var vm = this;
		vm.startNewDocument = startNewDocument;
		vm.addNewNode = addNewNode;
		vm.addDataToTree = addDataToTree;
		vm.connectNode = connectNode;

		vm.editNode = editNode;
		vm.selectNode = selectNode;
		vm.selectConnection =  selectConnection;
		
		vm.unselectNode = unselectNode;
		vm.removeTreeItem = removeTreeItem;
		vm.deleteDocument = deleteDocument;
		vm.test = test;
		vm.previewNode = previewNode;
		
		
		//vm.testImageDetails = testImageDetails;

		var applicationModes = appStates.ApplicationModes;
		
		vm.state = applicationModes.START;
		
		var nodeConnections = {
			'source': '',
			'target': ''
		};

		function setApplicationState(state) {
			vm.state = appStates.setApplicationMode(state);
		}

		/* Managing modal dialogs, passing and storing relevant data */
		
		
		
		
		
		

		/* New document */
		function startNewDocument() {
			dialogService.dialogManager(treeActions.newDocument, { docType: 'document' }).then(function(data){
				vm.currentDocument = decisionFactory.startNewDocument(data);
				setApplicationState(applicationModes.DOCUMENT);
			});
		};
	
		/* Adding new node to the view */
		function addNewNode() {
			if(vm.currentDocument) {
				dialogService.dialogManager(treeActions.newTreeItem, { docType: 'node' }).then(function(data){
					var node = decisionFactory.addNewNode(data);
					communicationChannel.addNode(node);
				});
			}
		}

		// Node selected
		function selectNode(id) {
			// update state service about selected node
			appStates.setCurrentTreeItem({
				type: 'nodes',
				id: id
			});
			// based on the current state we might either select clicked node or establish a connection with this node
			// this function is called from tree directive, since nodes and connection handlers are there. 
			// if node is already clicked unselecting will be handled there
			if(vm.state === applicationModes.DOCUMENT || vm.state === applicationModes.NODE || vm.state === applicationModes.CONNECTION) {
				nodeConnections.source = id;
				setApplicationState(applicationModes.NODE);
			}
			// if we decided to establish a connection
			if(vm.state === applicationModes.NODE_TARGET) {
				// enter basic info about connection
				dialogService.dialogManager(treeActions.newTreeItem,{	docType: 'connection' }).then(function(data){
						nodeConnections.target = id;
						data.target = id;
						data.source = nodeConnections.source;
						communicationChannel.connectNodes(decisionFactory.addNewConnection(data));
						setApplicationState(applicationModes.NODE);
				}, function() {
					setApplicationState(applicationModes.NODE);
				});
			}
			//
		};

		// establish a connection between nodes
		function connectNode() {
			setApplicationState(applicationModes.NODE_TARGET);
			communicationChannel.addConnectionSelected();
		}

		// unselect node
		function unselectNode() {
			setApplicationState(applicationModes.DOCUMENT);
			appStates.setCurrentTreeItem({
				type: '',
				id: ''
			});
		}



		/* Adding data to a node */
		function addDataToTree() {
			var treeItemType = appStates.getCurrentTreeItem().type;
			dialogService.dialogManager(treeActions.addData, {treeItemType: treeItemType}).then(function(data) {
				if(data){
					communicationChannel.dataSaved();
				}
			});
		}

		

		function editNode() {
			var treeItem = appStates.getCurrentTreeItem();
			dialogService.dialogManager(treeActions.editTreeItem, {treeItem: treeItem}).then(function(data) {
				if(data){
					//communicationChannel.dataSaved();
					console.log('ok something happened here');
				}
			});
		};
		

		

		function deleteDocument() {

		};

		

		


		function previewNode() {

		};

		function editConnection() {

		};

		function previewConnection() {

		};

		

		

		function selectConnection(connectionId) {
			
			if(connectionId){
				setApplicationState(applicationModes.CONNECTION);
				appStates.setCurrentTreeItem({
					type: 'connections',
					id: connectionId
				});
				
			}else{
				setApplicationState(applicationModes.DOCUMENT);
			}
			$scope.$apply();
		};


		function removeTreeItem(itemType) {
			console.log(itemType);
			dialogService.dialogManager(treeActions.deleteTreeItem).then(function() {
				unselectNode();
			});
		}

		function removeNode() {
			
		};

		function test(){
			decisionFactory.deleteNode(123);
		}


		function removeConnection() {
			console.log(vm.selectedConnection);
		}
	}
	
})();