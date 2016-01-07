(function(){
	"use strict";
	angular
  	.module('app.services')
  	.factory('decisionFactory', factory);

	/* @ngInject */
	function factory($mdDialog, communicationChannel, _) {
	  var service = {
	  	startNewDocument: startNewDocument,
	    addNewNode: addNewNode,
	    addNewConnection: addNewConnection,
	    deleteNode: deleteNode,
	    deleteConnection: deleteConnection,
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
	    deleteObject: deleteObject,
	    saveTreeItemStory: saveTreeItemStory,
	    getTreeItemStories: getTreeItemStories
	    
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
			this.story = [];
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
			this.story = [];
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
	  
	  /*svar testDoc = {
  "nodes": {
    "n745dcea1-1cfb-4f3f-8e76-2a1b3d6e96e4": {
      "description": {
        "title": "house",
        "tags": "",
        "text": ""
      },
      "id": "n745dcea1-1cfb-4f3f-8e76-2a1b3d6e96e4",
      "content": [
        {
          "sourceType": "nodes",
          "sourceId": "n745dcea1-1cfb-4f3f-8e76-2a1b3d6e96e4",
          "objectId": "8dd4d3cf5b78de98bd0f422eabc2168f"
        }
      ],
      "story": []
    },
    "nd4bda919-11bd-4157-916a-d5df7e9235e4": {
      "description": {
        "title": "room",
        "tags": "",
        "text": ""
      },
      "id": "nd4bda919-11bd-4157-916a-d5df7e9235e4",
      "content": [
        {
          "sourceType": "nodes",
          "sourceId": "nd4bda919-11bd-4157-916a-d5df7e9235e4",
          "objectId": "d950f5ba36e1696e21bdfc1c4254e5d5"
        }
      ],
      "story": []
    }
  },
  "connections": {
    "9b4a21b9-adba-4001-b97c-dd03a1ed2610": {
      "description": {
        "title": "ajme",
        "tags": "",
        "text": ""
      },
      "id": "9b4a21b9-adba-4001-b97c-dd03a1ed2610",
      "content": [
        {
          "sourceType": "connections",
          "sourceId": "9b4a21b9-adba-4001-b97c-dd03a1ed2610",
          "objectId": "b07e14f749701ec855864dc2d8ea42b0"
        },
        {
          "sourceType": "connections",
          "sourceId": "9b4a21b9-adba-4001-b97c-dd03a1ed2610",
          "objectId": "bbeb19de116f5d3d5c2c639d77c904ce"
        }
      ],
      "source": "n745dcea1-1cfb-4f3f-8e76-2a1b3d6e96e4",
      "target": "nd4bda919-11bd-4157-916a-d5df7e9235e4",
      "story": []
    }
  },
  "description": {
    "title": "house",
    "tags": "",
    "text": ""
  },
  "content": {
    "8dd4d3cf5b78de98bd0f422eabc2168f": {
      "description": {
        "title": "1",
        "tags": "",
        "text": ""
      },
      "type": "image",
      "fileLocation": "http://public.cyi.ac.cy/starcRepo/db/upload/8dd4d3cf5b78de98bd0f422eabc2168f.jpg",
      "textureLocation": "",
      "id": "8dd4d3cf5b78de98bd0f422eabc2168f",
      "width": 480,
      "height": 645,
      "thumbnail": "http://public.cyi.ac.cy/starcRepo/db/upload/8dd4d3cf5b78de98bd0f422eabc2168f_150.jpg",
      "format": "jpg",
      "completed": true,
      "sourceId": "n745dcea1-1cfb-4f3f-8e76-2a1b3d6e96e4",
      "sourceType": "nodes",
      "annotations": [
        "47b6dbb7-7032-4be5-a923-67fe33fe1710",
        "d8614b47-a20c-4417-bc89-943da231aa10"
      ],
      "status": "ok",
      "fileName": "thumb.jpeg"
    },
    "d950f5ba36e1696e21bdfc1c4254e5d5": {
      "description": {
        "title": "2",
        "tags": "",
        "text": ""
      },
      "type": "image",
      "fileLocation": "http://public.cyi.ac.cy/starcRepo/db/upload/d950f5ba36e1696e21bdfc1c4254e5d5.jpg",
      "textureLocation": "",
      "id": "d950f5ba36e1696e21bdfc1c4254e5d5",
      "width": 480,
      "height": 645,
      "thumbnail": "http://public.cyi.ac.cy/starcRepo/db/upload/d950f5ba36e1696e21bdfc1c4254e5d5_150.jpg",
      "format": "jpg",
      "completed": true,
      "sourceId": "nd4bda919-11bd-4157-916a-d5df7e9235e4",
      "sourceType": "nodes",
      "annotations": [
        "af25cdfd-b8d0-4b8b-91ba-242199d3059e",
        "76763e44-5f92-4eed-bcf6-cae600357828"
      ],
      "status": "ok",
      "fileName": "thumb.jpeg"
    },
    "b07e14f749701ec855864dc2d8ea42b0": {
      "description": {
        "title": "3",
        "tags": "",
        "text": ""
      },
      "type": "image",
      "fileLocation": "http://public.cyi.ac.cy/starcRepo/db/upload/b07e14f749701ec855864dc2d8ea42b0.jpg",
      "textureLocation": "",
      "id": "b07e14f749701ec855864dc2d8ea42b0",
      "width": 480,
      "height": 645,
      "thumbnail": "http://public.cyi.ac.cy/starcRepo/db/upload/b07e14f749701ec855864dc2d8ea42b0_150.jpg",
      "format": "jpg",
      "completed": true,
      "sourceId": "9b4a21b9-adba-4001-b97c-dd03a1ed2610",
      "sourceType": "connections",
      "annotations": [
        "69ab0376-ecd2-4295-b826-6f6883457987",
        "7b78c843-666e-4f83-a69a-c82d6eb4de07"
      ],
      "status": "ok",
      "fileName": "thumb.jpeg"
    },
    "bbeb19de116f5d3d5c2c639d77c904ce": {
      "description": {
        "title": "4",
        "tags": "",
        "text": ""
      },
      "type": "image",
      "fileLocation": "http://public.cyi.ac.cy/starcRepo/db/upload/bbeb19de116f5d3d5c2c639d77c904ce.jpg",
      "textureLocation": "",
      "id": "bbeb19de116f5d3d5c2c639d77c904ce",
      "width": 512,
      "height": 512,
      "thumbnail": "http://public.cyi.ac.cy/starcRepo/db/upload/bbeb19de116f5d3d5c2c639d77c904ce_150.jpg",
      "format": "jpg",
      "completed": true,
      "sourceId": "9b4a21b9-adba-4001-b97c-dd03a1ed2610",
      "sourceType": "connections",
      "annotations": [
        "b7d234b1-e4f6-4f72-bf32-4894605e6da7",
        "0d8d4332-b104-4e00-bd32-c08e0553cd1a"
      ],
      "status": "ok",
      "fileName": "texture.png"
    }
  },
  "annotations": {
    "47b6dbb7-7032-4be5-a923-67fe33fe1710": {
      "description": {
        "title": "1a1",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 48,
        "y": 64.5,
        "width": 400.5,
        "height": 168,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    },
    "d8614b47-a20c-4417-bc89-943da231aa10": {
      "description": {
        "title": "1a2",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 36,
        "y": 280.5,
        "width": 400.5,
        "height": 168,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    },
    "af25cdfd-b8d0-4b8b-91ba-242199d3059e": {
      "description": {
        "title": "2a1",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 48,
        "y": 64.5,
        "width": 364.5,
        "height": 165,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    },
    "76763e44-5f92-4eed-bcf6-cae600357828": {
      "description": {
        "title": "2a2",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 34.5,
        "y": 349.5,
        "width": 364.5,
        "height": 165,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    },
    "69ab0376-ecd2-4295-b826-6f6883457987": {
      "description": {
        "title": "3a1",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 48,
        "y": 64.5,
        "width": 378,
        "height": 195,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    },
    "7b78c843-666e-4f83-a69a-c82d6eb4de07": {
      "description": {
        "title": "3a2",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 51,
        "y": 391.5,
        "width": 378,
        "height": 195,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    },
    "b7d234b1-e4f6-4f72-bf32-4894605e6da7": {
      "description": {
        "title": "4a1",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 51.2,
        "y": 51.2,
        "width": 385.6,
        "height": 137.6,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    },
    "0d8d4332-b104-4e00-bd32-c08e0553cd1a": {
      "description": {
        "title": "4a2",
        "tags": "",
        "text": ""
      },
      "objectType": "image",
      "coordinates": {
        "x": 70.4,
        "y": 275.2,
        "width": 385.6,
        "height": 137.6,
        "rotate": 0,
        "scaleX": 1,
        "scaleY": 1
      }
    }
  }
};*/
	  function deleteNode(nodeId) {
	  	// notify tree to remove the node
	  	var connections = [];
	  	var annotations = [];
	  	var content = [];
	  	// lets get all the content from related to the node directly
	  	doc.nodes[nodeId].content.forEach(function(item) {
	  		content.push(item.objectId);
	  		annotations = annotations.concat(doc.content[item.objectId].annotations);
	  	});

			for (var connectionId in doc.connections) {
  			if(doc.connections.hasOwnProperty(connectionId)) {
  				if(doc.connections[connectionId].source === nodeId || doc.connections[connectionId].target === nodeId){
  					deleteConnection(connectionId, doc);
  				}
  			}
			}

			annotations.forEach(function(annotationId) {
				delete doc.annotations[annotationId];
			});

			content.forEach(function(objectId){
				delete doc.content[objectId];
			});
			
			delete doc.nodes[nodeId];
			
			communicationChannel.removeNode({
				nodeId: nodeId,
				connections: connections
			});



			console.log(doc);

			
	  }

	  function deleteConnection(connectionId) {
	  	var annotations = [];
	  	var content = [];

	  	
			doc.connections[connectionId].content.forEach(function(object){
				content.push(object.objectId);
				annotations = annotations.concat(doc.content[object.objectId].annotations);
			});
			
			annotations.forEach(function(annotationId) {
				delete doc.annotations[annotationId];
			});

			content.forEach(function(objectId){
				delete doc.content[objectId];
			});



	  	delete doc.connections[connectionId];

	  	communicationChannel.removeConnection({
				connectionId: connectionId,
			});

			console.log(doc);

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

	  function saveTreeItemStory(data) {
	  	doc[data.type][data.id].story = [];
	  	
      data.content.forEach(function(block) {
	  		var blockDescription = {
	  			mode: block.mode,
	  			data: '',
          id: block.id
	  		};

	  		if(block.mode === 'ADD_OBJECTS'){
	  			var dataArr = [];
	  			blockDescription.data = [];
          block.data.forEach(function(item) {
	  				blockDescription.data.push(item.id);
	  			});
	  		}else{
	  			blockDescription.data = block.data;
	  		}
	  		doc[data.type][data.id].story.push(blockDescription);
	  	});
	  	
	  }

	  function getTreeItemStories(treeItem) {
      return _.cloneDeep(doc[treeItem.type][treeItem.id].story);
	  }




		return service;


	}

	


})();