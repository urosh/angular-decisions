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
	  function newDocument(title, tags, description) {
	  	var doc = new Decision(title, tags, description);
	  	service.documents.push(doc);
	  	return doc;
	  }

	  function addNode() {
	  	console.log('adding node in factory');
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

	function Node() {
		//var this;
		//return this;
	}

	function Connection() {

	}

	function Content() {

	}
})();