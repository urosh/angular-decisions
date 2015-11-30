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
	    templateUrl: 'scripts/create/templates/createDecisions.html'
	  };
	  return directive;
	}

	/* @ngInject */
	function Controller ($scope, communicationChannel, $mdDialog, decisionFactory, userActions, dialogMessages, appStates) {
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
		vm.addDataToTree = addDataToTree;
		
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
		
		var modalStates = []; // here i store modal states 
		
		dialogMessages.onModalForward($scope, function(item){
			dialogManager(userActions[item.next], item.locals);
			modalStates.push(item);
		});

		dialogMessages.onModalReverse($scope, function() {
			var item = modalStates.pop();
			if(item){
				dialogManager(userActions[item.current], item.locals);
			}
		});


		function dialogManager(dialogType, obj) {
			var dialogData = userActions.getDialogData(dialogType);
			//var locals = obj ? obj.data : {};
			var locals = obj || {};
			return $mdDialog.show({
	      controller: dialogData.controller,
	      templateUrl: dialogData.templateUrl,
	      parent: angular.element(document.body),
	      locals: locals,
	      openFrom: angular.element(document.querySelector(dialogData.openFrom)),
	      closeTo: angular.element(document.querySelector(dialogData.closeTo))
	    });
		}
		
		/*function testImageDetails(){
			console.log('we are here?');
			dialogManager(userActions['edit3D']).then(function(data){
      	console.log('ok we are editing and closing');
      });
		}*/

		/*function testImageDetails(){
			var nextItem = 'editImage';
      decisionFactory.activeObject({
      	completed: true,
				docID: "dab40bd2bfda4281f8ed5c60c467a1b0",
				fileLocation: "http://public.cyi.ac.cy/starcRepo/db/upload/dab40bd2bfda4281f8ed5c60c467a1b0.jpg",
				fileName: "thumb.jpeg",
				format: "jpg",
				height: 645,
				progressPercentage: 100,
				status: "ok",
				thumbnail: "http://public.cyi.ac.cy/starcRepo/db/upload/dab40bd2bfda4281f8ed5c60c467a1b0_150.jpg",
				type: "image",
				width: 480,
      }); // 
      dialogManager(userActions['editImage']).then(function(data){
      	console.log('ok we are editing and closing');
      });

      
		}*/


		/* New document */
		function startNewDocument() {
			dialogManager(userActions.newDocument, { docType: 'document' }).then(function(data){
				vm.currentDocument = decisionFactory.startNewDocument(data);
				setApplicationState(applicationModes.DOCUMENT);
			});
		};
	
		/* Adding new node to the view */
		function addNewNode() {
			if(vm.currentDocument) {
				dialogManager(userActions.newNode, { docType: 'node' }).then(function(data){
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
			console.log(vm.state);
			if(vm.state === applicationModes.DOCUMENT || vm.state === applicationModes.NODE || vm.state === applicationModes.CONNECTION) {
				console.log('we are here?');
				nodeConnections.source = id;
				setApplicationState(applicationModes.NODE);
			}
			// if we decided to establish a connection
			if(vm.state === applicationModes.NODE_TARGET) {
				// enter basic info about connection
				dialogManager(userActions.newConnection,{	docType: 'connection' }).then(function(data){
						nodeConnections.target = id;
						data.target = id;
						data.source = nodeConnections.source;
						communicationChannel.connectNodes(decisionFactory.addNewConnection(data));
						setApplicationState(applicationModes.NODE);
				}, function() {
					setApplicationState(applicationModes.NODE);
				});
			}
			console.log(vm.state);
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
			dialogManager(userActions.addDataToNode, {treeItemType: treeItemType}).then(function(data) {
				if(data){
					communicationChannel.dataSaved();
				}
			});
		}

		

		function editNode() {
			dialogManager(userActions.editNode).then(function(data) {
				if(data){
					//communicationChannel.dataSaved();
					console.log('ok something happened here');
				}
			});
		};
		

		function removeNode() {
			dialogManager(userActions.deleteNode).then(function() {
				unselectNode();
			});

			// i need to tell my data service i want to remove the node and its connections
			// but before this i need to ask user if they are sure about what they are about to do. 

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

		function removeConnection() {
			console.log(vm.selectedConnection);
		}
	}
	
})();