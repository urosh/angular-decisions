(function(){
	"use strict";
	angular
  	.module('app.buildDecisions')
  	.factory('decisionFactory', factory);

	/* @ngInject */
	function factory($mdDialog, communicationChannel, _) {
	  var service = {
	  	startNewDocument: startNewDocument,
	    addNewNode: addNewNode,
	    addNewConnection: addNewConnection,
	    deleteNode: deleteNode,
	    generateID: createGuid,
	    getObjectList: getObjectList,
	    addObjectToTree: addObjectToTree,
	    getObject: getObject,
	    activeObject: activeObject,
	    updateObjectDescription: updateObjectDescription,
	    addAnnotation: addAnnotation,
	    deleteAnnotation: deleteAnnotation,
	    getAnnotationList: getAnnotationList,
	    getObjectDescription: getObjectDescription,
	    deleteObject: deleteObject 
	  };
	  
	  var ref = new Firebase("https://starc-decisions.firebaseio.com");



	  var doc = doc || {};
	  
	  var activeObj = {};

	  // this is just for testing purposes 
	  function activeObject(obj) {
	  	if(obj){
		  	activeObj = obj;
	  	}
	  	return activeObj;
	  }

	  function createGuid(){
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
	    });
		};

		function Description(title, tags, text) {
			this.title = title || '';
			this.tags = tags || '';
			this.text = text  || '';
		}

	  function Decision(title, tags, text) {
			this.nodes = {}; // array of node id's
			this.connections = {}; // array of connection id's
			this.description = new Description(title, tags, text);
			this.content = {};
			this.annotations = {};

		}
		Decision.prototype.addItem = function(item) {
			this.content[item.id] = item;
		};

		Decision.prototype.addNode = function(node) {
			this.nodes[node.id] = node;
		}

		Decision.prototype.addConnection = function(connection) {
			this.connections[connection.id] = connection;
		}


		function Node(title, tags, text, id) {
			this.description = new Description(title, tags, text);
			this.id = id || ''; // text
			this.content = []; // array of object id's
		}


		Node.prototype.addItem = function(obj){
			this.content.push(obj);
		}



		function DataItem(item) {
			this.description = new Description(item.title, item.tags, item.description);
			this.type = item.type;
			this.fileLocation = item.fileLocation;
			this.textureLocation = item.textureLocation || '';
			this.id = item.id;
			this.width = item.width || '';
			this.height = item.height || '';
			this.thumbnail = item.thumbnail || '';
			this.format = item.format  || '';
			this.completed = item.completed;
			this.sourceId = '';
			this.sourceType = '';
			this.annotations = [];
			this.status = item.status || '';
			this.fileName = item.fileName || '';
		}

		function Connection(connection) {
			this.description = new Description(connection.title, connection.tags, connection.text);
			this.id = ''; // text
			this.content = []; // array of object id's
			this.source = connection.source || '';
			this.target = connection.target || '';
		}

		Connection.prototype.addItem = function(obj){
			this.content.push(obj);
		}
		



		function Annotation(title, tags, text, coords) {
			this.description = new Description(title, tags, text);
			this.coords = coords || {};
			this.id = id;
		};

		

		/*****************************************************/
	  /* Adding new document */
	  /*****************************************************/
	  function startNewDocument(data) {
	  	doc = new Decision(data.title, data.tags, data.text);
	  	communicationChannel.addDocument();
	    return doc;
	  }


	  /*****************************************************/
	  /* Adding new node */
	  /*****************************************************/
		function addNewNode(data){
			var id = 'n' + createGuid();
			var node = new Node(data.title, data.tags, data.text, id);
			doc.addNode(node);
			return node;
		}

		// Adding new connection
		function addNewConnection(data){
			var id = createGuid();
			var connection = new Connection(data);
			connection.id = id;
			doc.addConnection(connection);
			return connection;
		}

		// delete digital object
	 	function deleteObject(id, treeItem) {
	 		// removing object reference
	 		

	 		// removing object reference from node/connection
	 		doc[treeItem.type][treeItem.id].content = _.filter(doc[treeItem.type][treeItem.id].content, function(item){
	 			return item.objectId !== id;
	 		});

			// removing object's annotations
			doc.content[id].annotations.forEach(function(annotationId){
				delete doc.annotations[annotationId];
			});

			delete doc.content[id];

	 		console.log(doc);
	 	}
	  
	  function deleteNode(nodeId) {
	  	
	  	// notify tree to remove the node

	  	var connections = [];
	  	var annotations = [];
	  	var content = [];
	  	
	  	for (var connectionId in doc.connections) {
  			if(doc.connections.hasOwnProperty(connectionId)) {
  				if(doc.connections[connectionId].source === nodeId || doc.connections[connectionId].target === nodeId){
  					connections.push(connectionId);
  				}
  			}
			}

			for (var contentId in doc.content) {
				if(doc.content.hasOwnProperty(contentId)) {
					if(doc.content[contentId].sourceId === nodeId){
						content.push(contentId);
						annotations = annotations.concat(doc.content[contentId].annotations);
					}	
				}
			}
			// notify tree to remove connections
			connections.forEach(function(connectionId) {
				delete doc.connections[connectionId];
			});
			annotations.forEach(function(annotationId) {
				delete doc.annotations[annotationId];
			});
			
			delete doc.nodes[nodeId];
			communicationChannel.removeNode({
				nodeId: nodeId,
				connections: connections
			});

			
			// i need to remove annotations and content of the given node 

			
	  }

	  // i need to add deleteConnection handler 
	  // i need to add deleteObject handler

	  
	  function getCurrentDocument() {
	  	return doc;
	  }

	  
  	// for current tree item i need to get the list of its objects
  	// so i need to look at node.content. this is array of id
  	// and then i access doc.content to get actual objects based on id's.
	  function getObjectList(currentTreeItem) {

	  	var idList = [];
	  	var objectList = [];
	  	
	  	idList = doc[currentTreeItem.type][currentTreeItem.id].content;
	  	idList.forEach(function(item) {
	  		objectList.push(doc.content[item.objectId]);
	  	});
	  	return _.cloneDeep(objectList);

	  }


	  // adding digital object (image or 3d) to a node or connection
	  function addObjectToTree(treeItem, item) {

	  	var objectItem = new DataItem(item);
	  	objectItem.sourceType = treeItem.type;
	  	objectItem.sourceId = treeItem.id;
	  	var currentTreeItem = doc[treeItem.type][treeItem.id];
	  	doc.addItem(objectItem);
	  	currentTreeItem.addItem({
	  		sourceType: treeItem.type,
	  		sourceId: treeItem.id,
	  		objectId: objectItem.id 
	  	});
	  };

	  function getObject(id) {
	  	return _.cloneDeep(doc.content[id]);
	  }

	  // updating digital object description
	  function updateObjectDescription(currentObject, itemData){
	  	var item = doc.content[currentObject.id];
	  	item.description = new Description(itemData.title, itemData.tags, itemData.text);
	  }

	  // adding annotation to the digital object
	  function addAnnotation(currentObject, annotation) {
	  	var item = doc.content[currentObject.id];
	  	var id;
	  	if(annotation.id === ''){
	  		id = createGuid();
	  		item.annotations.push(id);
	  	}else{
	  		id = annotation.id;
	  	}
	  	doc.annotations[id] = {
	  		'description': new Description(annotation.description.title, annotation.description.tags, annotation.description.text),
	  		'objectType': currentObject.type,
	  		'coordinates': annotation.coordinates
	  	};
	  	console.log(new Description());
	  	console.log(doc);
	  	return id;

	  	

	  }

	  // deleting annotation 
	  function deleteAnnotation(currentObject, id) {
	  	delete doc.annotations[id];
	  	var item = doc.content[currentObject.id];
	  	var annotationIndex;
	  	item.annotations.forEach(function(annotation, index) {
	  		if(annotation.id === id) {
	  			annotationIndex = index;
	  		}
	  	});
	  	item.annotations.splice(annotationIndex, 1);
	  	
	  }

	  function getAnnotationList(id) {
	  	var item = doc.content[id];
	  	var annotations = [];
	  	item.annotations.forEach(function(id, index) {
	  		annotations.push(doc.annotations[id]);
	  	});
	  	return _.cloneDeep(annotations);
	  }

	  function getObjectDescription(id) {
	  	var item = doc.content[id];
	  	return item.description;
	  }


		return service;


	}

	


})();