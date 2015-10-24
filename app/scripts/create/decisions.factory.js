(function(){
	"use strict";
	angular
  	.module('app.buildDecisions')
  	.factory('decisionFactory', factory);

	/* @ngInject */
	function factory($mdDialog, communicationChannel) {
	  var service = {
	    startNewDocument: startNewDocument,
	    addNewNode: addNewNode,
	    saveNewNode: saveNewNode,
	    addDataToNode: addDataToNode,
	    editNode: editNode,
	    removeNode: removeNode,
	    documents: [],
	    selectedNode: '',
	    selectedConnection: '' ,
	    generateID: createGuid 
	  };
	  
	  var ref = new Firebase("https://starc-decisions.firebaseio.com");



	  var doc = doc || {};
	  var selectedNode = '';
	  var selectedConnection = '';
	  var nodes = {}, 
	  		connections = {}, 
	  		content = {};

	  function createGuid(){
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
	    });
		};


	  function Decision(title, tags, description) {
			this.nodes = []; // array of node id's
			this.connections = []; // array of connection id's
			this.title = title; // text
			this.tags = tags; // text 
			this.description = description; // text
		}

		Decision.prototype.addNode = function(node) {
			this.nodes.push(node.id);
		}

		function Node(title, tags, description, id) {
			//var this;
			//return this;
			this.title = title; // text 
			this.tags = tags; // text
			this.description = description; // text
			this.id = id; // text
			this.content = []; // array of object id's
		}

		Node.prototype.addItem = function(obj){
			this.content.push(obj.docID);
		}

		function DataItem(item) {
			this.type = item.type;
			this.fileLocation = item.fileLocation;
			this.docID = item.docID;
			this.width = item.width || '';
			this.height = item.height || '';
			this.thumbnail = item.thumbnail || '';
			this.title = item.title || '';
			this.tags = item.tags || '';
			this.description = item.description || '';
			this.format = item.format  || '';

		}

		function Connection() {

		}

		function Content() {

		}

		/*****************************************************/
	  /* Adding new document */
	  /*****************************************************/
	  /* @ngInject */
	  
	  /* @ngInject */
	  function startNewDocumentControler($scope) {
	  	$scope.close = function() {
		    $mdDialog.hide();
		  };
		  $scope.addNewDocument = function() {
		  	if($scope.documentForm.$valid) {
		  		$mdDialog.hide($scope.document);
		  	}
		  }
	  };

	  function startNewDocument(ev) {
	  	return $mdDialog.show({
	      controller: startNewDocumentControler,
	      templateUrl: 'scripts/create/newDocument.dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	    }).then(function(data){
	    	doc = new Decision(data.title, data.tags, data.text);
	    	communicationChannel.addDocument();
	    	return doc;
	    });
	  }


	  /*****************************************************/
	  /* Adding new node */
	  /*****************************************************/

	  /* @ngInject */
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
		
		function addNewNode(ev) {
			return $mdDialog.show({
	      controller: NewNodeController,
	      templateUrl: 'scripts/create/newNode.dialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	    })
	    .then(function(newDocument) {
	    	if(newDocument !== undefined){
		    	communicationChannel.addNode(newDocument);
		    	//var newNode = new Node(newDocument.title, newDocument.tags, newDocument.text, newDocument.id);
	  			//doc.addNode(newNode);
	    	}
	    });
		}

		function saveNewNode(node){
			var newNode = new Node(node.title, node.tags, node.text, node.id);
			nodes[node.id] = newNode;
			doc.addNode(newNode);

			console.log('OK now we added new node. It is saved, and we use node and doc to store our data');
			console.log(doc);
			console.log(nodes);
			console.log('----------------------------');
		}	

	 
	  /* @ngInject */
	  function removeNode() {
	  	console.log('removing node from factory');
	  }

	  /*************************************************/
	  /* Adding data to a node*/
	  /*************************************************/
	  /* @ngInject */
	  function addDataToNodeControler($scope, Upload, objects, $mdDialog) {
	  	var currentNode = service.selectedNode;

	  	$scope.close = function() {
				$mdDialog.hide();
			}
			
			$scope.objects = objects || [];
			$scope.submit = function() {
	      if (form.file.$valid && $scope.file && !$scope.file.$error) {
	        $scope.upload($scope.file);
	      }
	    }
	    /* Editing an object */

	    function editObjectControler($scope, object){
	    	$scope.close = function() {
	    		$mdDialog.hide();
	    	}

	    	$scope.object = object;
	    	$scope.descriptions = [
	    		'Image description', 
	    		'Annotation'
	    	]
	    }

	    $scope.editObject = function(ev, type, index) {
	    	console.log(type, index);
	    	console.log($scope.objects[index]);
	    	var docID = $scope.objects[index]['docID'];
	    	var template = (type === 'image' ? 'scripts/create/editImage.dialog.tmpl.html' : 'scripts/create/edit3D.dialog.tmpl.html' );
	    	$mdDialog.show({
				  controller: editObjectControler,
		      locals: {
		      	object: $scope.objects[index]
		      },
		      clickOutsideToClose: true,
		      bindToControler: true,
		      templateUrl: 'scripts/create/editImage.dialog.tmpl.html',
		      parent: angular.element(document.body),

		    })
		    .then(function() {
		    	console.log('do we get here?');
					// i need to do something with data retrieved from editing object. 	
					showAddDataDialog(ev, $scope.objects);
				});


	    	// ok i have the id of the object i am editing.

	    };	

	    // save objects to the node
	    $scope.saveObjects = function() {
	    	$scope.objects.forEach(function(item){
	    		var obj = new DataItem(item);
	    		content[obj.docID] = obj;
	    		nodes[currentNode].addItem(obj);
	    		$scope.objects = [];

	    		console.log('-------------------------------------------------');
	    		console.log(currentNode);
	    		console.log(doc);
	    		console.log(nodes);
	    		console.log(content);
	    		console.log('-------------------------------------------------');
	    		$mdDialog.hide('ok');
	    	});
	    	// ok here we need access to the node info. 
	    	// then we need to create content instances
	    	// add their references to node object
	    	// save instances to the array 

	    };

		  function deleteObjectControler($scope, object, $mdDialog){
				$scope.object = object;
				$scope.answer = function(ev, type) {
					$mdDialog.hide(type);
				}
			}

	    $scope.removeObject = function(ev, index) {
	    	$mdDialog.show({
				  controller: deleteObjectControler,
		      locals: {
		      	object: $scope.objects[index]
		      },
		      bindToControler: true,
		      templateUrl: 'scripts/create/deleteObject.dialog.tmpl.html',
		      parent: angular.element(document.body)
		    })
		    .then(function(answer) {
					if(answer === 'yes') {
						$scope.objects.splice(index, 1);
					}	
					showAddDataDialog(ev, $scope.objects);
				});
			}


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
	            if(evt.config._file){
		            $scope.objects[$scope.objects.length - 1]['fileName'] = evt.config._file.name;
		            $scope.objects[$scope.objects.length - 1]['progressPercentage'] = parseInt(100.0 * evt.loaded / evt.total);;
		          }
	        }).success(function (data, status, headers, config) {
	        		var currentIndex = $scope.objects.length -1;
	        		console.log(data);
	        		$scope.objects[currentIndex]['width'] = data.width || '';
	        		$scope.objects[currentIndex]['height'] = data.height || '';
	        		$scope.objects[currentIndex]['docID'] = data.docID || '';
	        		$scope.objects[currentIndex]['format'] = data.format || '';
	        		$scope.objects[currentIndex]['thumbnail'] = data.thumbnail || '';
	        		$scope.objects[currentIndex]['completed'] = true;
	            $scope.objects[currentIndex]['status'] = 'ok';	
	            $scope.objects[currentIndex]['fileLocation'] = data.fileLocation;
	            $scope.objects[currentIndex]['type'] = data.type;
	        }).error(function (data, status, headers, config) {
	            $scope.objects.splice($scope.objects.length-1, 1);
	            console.log('There was an error while uploading the file');
	        })
	    		
	    	}
	    }



	  }
	  
	  function showAddDataDialog(ev,  objects){
    	
	  	return $mdDialog.show({
	      controller: addDataToNodeControler,
	      clickOutsideToClose: false,
	      templateUrl: 'scripts/create/addData.dialog.tmpl.html',
	      parent: angular.element(document.body),
	      locals: {
	      	objects: objects || [],
	      },
	      targetEvent: ev,
	    })
	  };

	  function addDataToNode(ev) {
	  	return showAddDataDialog(ev);
	  }

	  /* Editing a node */
	  function EditNodeControler($scope, $mdDialog) {
			$scope.close = function() {
		    $mdDialog.hide();
		  };
		  
		};

	  function editNode(ev) {
	  	return $mdDialog.show({
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
	  }

		return service;
		  ////////////////


	}

	


})();