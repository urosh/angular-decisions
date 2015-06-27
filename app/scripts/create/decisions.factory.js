(function(){
	"use strict";
	angular
  	.module('app.buildDecisions')
  	.factory('decisionFactory', factory);

	/* @ngInject */
	function factory() {
	  var service = {
	    newDocument: newDocument,
			documents: []  
	  };
	  
	  return service;
	  ////////////////
	  function newDocument(title, tags, description) {
	  	var doc = new Decision(title, tags, description);
	  	service.documents.push(doc);
	  	console.log(doc);
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