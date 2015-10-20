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
	  // Usage:
	  //
	  // Creates:
	  //
	  var directive = {
	    controller: 'Controller',
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
	/* Dialog controler*/
	function startNewDocumentControler($scope, $mdDialog) {
	  $scope.answer = function() {
	    $mdDialog.hide();
	  };

	  $scope.addNewDocument = function() {
	  	if($scope.documentForm.$valid) {
	  		$mdDialog.hide($scope.document);
	  	}
	  }

	}

	/* Dialog controler*/
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

	/* Dialog controler*/
	function addDataControler($scope, Upload, objects, $mdDialog) {
		$scope.close = function() {
			$mdDialog.hide();
		}
		$scope.objects = objects || [];
		$scope.submit = function() {
      if (form.file.$valid && $scope.file && !$scope.file.$error) {
        $scope.upload($scope.file);
      }
    }
	    
    $scope.removeObject = function(ev, index) {
    	var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this object?')
        .ariaLabel('Deleting an object')
        .targetEvent(ev)
        .ok('Ok')
        .cancel('Cancel');
	    
	    $mdDialog.show(confirm).then(function() {
	    	$scope.objects.splice(index, 1);
	    	console.log($scope.objects);
	    	showAddObjectModal(ev);
	    }, function(){
	    	showAddObjectModal(ev);
	    });
    };

    function showAddObjectModal(){
    	console.log($scope.objects);
    	$mdDialog.show({
				  //targetEvent: ev,
				  controller: addDataControler,
		      locals: {
		      	objects: $scope.objects
		      },
		      bindToControler: true,
		      templateUrl: 'scripts/create/addData.dialog.tmpl.html',
		      parent: angular.element(document.body),
		      
				});
    }

    $scope.editObject = function(tp) {
    	console.log('ok we are now editing an object');
    	console.log(tp);
    };


		$scope.progressPercentage = 0;
    $scope.upload = function (file) {
    	if(file){
	    	$scope.objects.push({
        	'fileName': '',
        	'progressPercentage': 0,
        	'thumbnail': '',
        	'fileLocation': '',
        	'status': '',
        	'completed': false
        });

        Upload.upload({
          url: 'http://public.cyi.ac.cy/starcRepo/decisions/upload',
          method: 'POST',
					file: file,
					sendFieldsAs: 'form',
        }).progress(function (evt) {
            //$scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            if(evt.config._file){
	            $scope.objects[$scope.objects.length - 1]['fileName'] = evt.config._file.name;
	            $scope.objects[$scope.objects.length - 1]['progressPercentage'] = parseInt(100.0 * evt.loaded / evt.total);;
	          }
            //console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config._file.name);
        }).success(function (data, status, headers, config) {
        		$scope.objects[$scope.objects.length -1]['completed'] = true;
            $scope.objects[$scope.objects.length -1]['status'] = 'ok';
            $scope.objects[$scope.objects.length -1]['fileLocation'] = data.fileLocation;
            $scope.objects[$scope.objects.length -1]['type'] = data.type;

        }).error(function (data, status, headers, config) {
            //console.log('error status: ' + status);
            $scope.objects[$scope.objects.length -1]['completed'] = true;
            $scope.objects[$scope.objects.length -1]['status'] = 'error';
        })
    		
    	}
    };


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
		vm.addData = addData;
		vm.selectedConnection = "";
		
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

		
		
		

		

		
		/*************************************************/
		/* New document */
		/*************************************************/

		

		function startNewDocument(ev) {
			// open modal window for creating a document
			$mdDialog.show({
	      controller: startNewDocumentControler,
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
		/*************************************************/
		/* Adding new node to the view */
		/*************************************************/
		

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
		/*************************************************/
		/* Adding data to a node controler */
		/*************************************************/


		function addData(ev) {
			$mdDialog.show({
	      controller: addDataControler,
	      clickOutsideToClose: false,
	      templateUrl: 'scripts/create/addData.dialog.tmpl.html',
	      parent: angular.element(document.body),
	      locals: {
	      	objects: []
	      },
	      targetEvent: ev,
	    })
	    .then(function(newDocument) {
	    	
	    });
		}



		function removeNode() {

		};

		function deleteDocument() {

		};

		function EditNodeControler($scope, $mdDialog) {
			$scope.close = function() {
		    $mdDialog.hide();
		  };
		  
		};

		function editNode(ev) {
			console.log('ok we can now edit node');
			$mdDialog.show({
	      controller: EditNodeControler,
	      templateUrl: 'scripts/create/editNode.dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
	    .then(function(newDocument) {
	    	if(newDocument !== undefined){
		    	communicationChannel.addNode(newDocument);
	    		
	    	}
	    });
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
			}
			if(vm.state === "_NODE_TARGET_") {
				nodeConnections.target = id;
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