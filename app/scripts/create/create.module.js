(function(){
	"use strict";

	angular.module('buildDecisions', []);

	angular
		.module('buildDecisions')
	  .directive('starcDecisionTree', decisionTreeDirective);
	  
	/* @ngInject */
	function decisionTreeDirective () {
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

	  	jsPlumb.ready(function () {
	  		console.log('ok our jsPlumb is ready');
	  		instance = jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            [ "Arrow", { location: 1 } ],
            [ "Label", {
                location: 0.1,
                id: "label",
                cssClass: "aLabel"
            }]
        	],
        	Container: "tree-content"
    		});
	  		// this is the paint style for the connecting lines..
    var connectorPaintStyle = {
        lineWidth: 4,
        strokeStyle: "#61B7CF",
        joinstyle: "round",
        outlineColor: "white",
        outlineWidth: 2
     	},
    // .. and this is the hover style.
        connectorHoverStyle = {
          lineWidth: 4,
          strokeStyle: "#216477",
          outlineWidth: 2,
          outlineColor: "white"
        },
        endpointHoverStyle = {
          fillStyle: "#216477",
          strokeStyle: "#216477"
        },
    // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
          endpoint: "Dot",
          paintStyle: {
              strokeStyle: "#7AB02C",
              fillStyle: "transparent",
              radius: 7,
              lineWidth: 3
          },
          isSource: true,
          connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
          connectorStyle: connectorPaintStyle,
          hoverPaintStyle: endpointHoverStyle,
          connectorHoverStyle: connectorHoverStyle,
          dragOptions: {}
         /* overlays: [
              [ "Label", {
                  location: [0.5, 1.5],
                  label: "Drag",
                  cssClass: "endpointSourceLabel"
              } ]
          ]*/
        },
    	// the definition of target endpoints (will appear when the user drags a connection)
        targetEndpoint = {
            endpoint: "Dot",
            paintStyle: { fillStyle: "#7AB02C", radius: 11 },
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: -1,
            dropOptions: { hoverClass: "hover", activeClass: "active" },
            isTarget: true,
            overlays: [
                [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel" } ]
            ]
        };

        

    		instance.batch(function () {
    			// make all the window divs draggable
    			instance.addEndpoint("node2" , sourceEndpoint, {
          	anchor: 'BottomCenter', uuid: 'node1BottomCenter'
        	});
        	instance.draggable(jsPlumb.getSelector(".decision-tree .node"), { grid: [20, 20] });
        	console.log('ok we are intializing');

    		})

    		jsPlumb.fire("jsPlumbDemoLoaded", instance);
    		

	  	})
	  }
	}
	/* @ngInject */
	function DecisionTreeController () {
		var vm = this;

		vm.nodes = [
			{'node' : 'first', 'style': {top: '40px', left: '220px'}, 'id' : 'node1'},
			{'node' : 'second', 'style': {top: '20px', left: '120px'}, 'id' : 'node2'},
			{'node' : 'second', 'style': {top: '120px', left: '420px'}, 'id' : 'node3'}
		]
		console.log('ok we are in a controller');
	}
	
})();