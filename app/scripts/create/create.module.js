(function(){
	"use strict";

	angular.module('app.buildDecisions', []);

	angular
		.module('app.buildDecisions')
	  .directive('starcDecisionTree', decisionTreeDirective);
	  
	/* @ngInject */
	function decisionTreeDirective ($timeout, communicationChannel, decisionFactory) {
	  // Usage:
	  //
	  // Creates:
	  //
	  var directive = {
	    controller: DecisionTreeController,
	    restrict: 'E',
	    controllerAs: 'vm',
	    link: link,
	    scope: {
	    	
	    },
	    templateUrl: 'scripts/create/decision.tree.tmpl.html'
	  };
	  return directive;
	  function link(scope, element, attrs) {
	  	var instance;
	  	scope.nodes = [];

			
			// this is the paint style for the connecting lines..
		  var connectorPaintStyle = {
        lineWidth: 2,
        strokeStyle: "#61B7CF",
        joinstyle: "round",
        outlineColor: "#61B7CF",
        outlineWidth: 0
		  },
		  
		  // .. and this is the hover style.
      connectorHoverStyle = {
        lineWidth: 2,
        strokeStyle: "#216477",
        outlineWidth: 0,
        outlineColor: "#216477"
      },

      endpointHoverStyle = {
        fillStyle: "#216477",
        strokeStyle: "#216477"
      },
  		// the definition of source endpoints (the small blue ones)
      sourceEndpoint = {
        endpoint: "Dot",
        paintStyle: {
            strokeStyle: "#eb974e",
            fillStyle: "#eb974e",
            radius: 5,
            lineWidth: 2
        },
        isSource: true,
        connector: [ "Flowchart", { stub: [40, 60], gap: 5, cornerRadius: 5, alwaysRespectStubs: true } ],
        connectorStyle: connectorPaintStyle,
        hoverPaintStyle: endpointHoverStyle,
        connectorHoverStyle: connectorHoverStyle,
        dragOptions: {
        	dragAllowedWhenFull : true
        },
        maxConnections:-1,
      },
  		// the definition of target endpoints (will appear when the user drags a connection)
      targetEndpoint = {
	      endpoint: "Dot",
	      paintStyle: { fillStyle: "#049372", radius: 5 },
	      hoverPaintStyle: endpointHoverStyle,
	      maxConnections: -1,
	      dropOptions: { hoverClass: "hover", activeClass: "active" },
	      isTarget: true,
      };

			scope.nodeClicked = function(id) {
  			/*if(id !== 'node1'){
	  			instance.connect({
					  source:"node1", 
					  target:id,
					  anchors:["BottomCenter", "TopCenter" ],
					  endpointStyle: targetEndpoint,
					  connector: [ "Flowchart", { stub: [40, 60], gap: 0, cornerRadius: 5 , alwaysRespectStubs: true} ],
					  connectorStyle: connectorPaintStyle,
	          connectorHoverStyle: connectorHoverStyle
					});
					instance.repaintEverything();
  			}

  			*/
	  	}

	  	communicationChannel.onAddDocument(scope, function() {
	    	scope.nodes = [];
	    	instance.detachEveryConnection();
	    	instance.deleteEveryEndpoint();
	    });
	  	var i = 0;

  		communicationChannel.onNodeAdded(scope, function(node) {
				decisionFactory.addNode(node);

				i++;
				var n = "node" + i;
				scope.nodes.push({'node' : node.title,'title': node.title, 'tags': node.tags, 'description': node.description, 'style': {top: '20px', left: '20px'}, 'id' : n});
				$timeout(function(){
					/*instance.addEndpoint(element[0].querySelector("#" + n) , sourceEndpoint, {
	          	anchor: 'BottomCenter', uuid: n + 'BottomCenter'
	        });
	        instance.addEndpoint(element[0].querySelector("#" + n) , targetEndpoint, {
	          	anchor: 'TopCenter', uuid: n + 'TopCenter'
	        });*/
					var el = document.getElementById(n);

					instance.draggable(el, {
						grid: [20, 20], 
						stop: function(event) {
				  		console.log(event.pos[0]);
				  		console.log(event.pos[1]);
				  	}
					});

					/*instance.draggable(element[0].querySelectorAll(".node"), { 
						grid: [20, 20], 
						stop: function(event) {
				  		console.log(event.pos[0]);
				  		console.log(event.pos[1]);
				  	} 
					});*/
				}, 50);

			});


  		

	  	jsPlumb.ready(function () {
	  		instance = jsPlumb.getInstance({
        	// default drag options
        	DragOptions: { cursor: 'pointer', zIndex: 2000 },
        	ConnectionsDetachable   : false,
        	Anchors : [ "BottomCenter", "TopCenter" ]
        });
	  	
	  	});
	  }
	}
	/* @ngInject */
	function DecisionTreeController (decisionFactory) {

		/*var vm = this;
		vm.nodes = [
			{'node' : 'first', 'style': {top: '40px', left: '220px'}, 'id' : 'node1'},
			{'node' : 'second', 'style': {top: '20px', left: '120px'}, 'id' : 'node2'},
			{'node' : 'second', 'style': {top: '120px', left: '420px'}, 'id' : 'node3'}
		]*/
		//console.log('ok we are in a controller');


	}
	
})();