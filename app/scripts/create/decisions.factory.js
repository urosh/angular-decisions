(function(){
	"use strict";
	angular
  	.module('app.buildDecisions')
  	.factory('decisionFactory', factory);

	/* @ngInject */
	function factory() {
	  var service = {
	    newDocument: newDocument,
	    addNode: addNode,
	    removeNode: removeNode,
			documents: []  
	  };
	  
	  return service;
	  ////////////////

	  var doc;

	  function newDocument(title, tags, description) {
	  	doc = new Decision(title, tags, description);
	  	service.documents.push(doc);
	  	return doc;
	  }

	  function addNode(node) {
	  	var newNode = new Node(node.title, node.tags, node.text, node.id);
	  	doc.addNode(newNode);
	  	console.log(doc);
	  }

	  function removeNode() {
	  	console.log('removing node from factory');
	  }

	  

	}

	function Decision(title, tags, description) {
		this.nodes = [];
		this.connections = [];
		this.title = title;
		this.tags = tags;
		this.description = description;
	}

	Decision.prototype.addNode = function(node) {
		this.nodes.push(node);

	}

	function Node(title, tags, description, id) {
		//var this;
		//return this;
		this.title = title;
		this.tags = tags;
		this.description = description;
		this.id = id;
	}

	function Connection() {

	}

	function Content() {

	}
})();