(function(){
	"use strict";

	angular.module('app.buildDecisions', []);

	angular
		.module('app.buildDecisions')
	  .directive('starcDecisionTree', decisionTreeDirective);
	  
	/* @ngInject */
	function decisionTreeDirective ($timeout, communicationChannel) {
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
	  	
	  	scope.buttonClicked = function buttonClicked() {
				scope.nodes.push({'node' : 'fourth', 'style': {top: '220px', left: '320px'}, 'id' : 'node4'});
				instance.repaintEverything();
				$timeout(function(){
					instance.draggable(element[0].querySelectorAll(".node"), { grid: [20, 20] });
				}, 50)
				
			};
			communicationChannel.onNodeAdded(scope, function() {
				console.log('ok node is added');
			});

			scope.nodes = [
				{'node' : 'first', 'style': {top: '40px', left: '220px'}, 'id' : 'node1'},
				{'node' : 'second', 'style': {top: '20px', left: '120px'}, 'id' : 'node2'},
				{'node' : 'second', 'style': {top: '120px', left: '420px'}, 'id' : 'node3'}
			]
			
	  	jsPlumb.ready(function () {
	  		//console.log('ok our jsPlumb is ready');

	  		instance = jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },

        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            [ "Arrow", { location: 1 } ],
          ],
        	//Container: "doc1"
    		});
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
		            lineWidth: 4,
		            strokeStyle: "#216477",
		            outlineWidth: 2,
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
		            dragOptions: {}
		            
		        },
		    // the definition of target endpoints (will appear when the user drags a connection)
		        targetEndpoint = {
		            endpoint: "Dot",
		            paintStyle: { fillStyle: "#049372", radius: 5 },
		            hoverPaintStyle: endpointHoverStyle,
		            maxConnections: -1,
		            dropOptions: { hoverClass: "hover", activeClass: "active" },
		            isTarget: true
		            
		        };
    
        $timeout(function(){
        	instance.repaintEverything();
	        var look = element.children('#node1');
	        instance.batch(function () {
	    			// make all the window divs draggable
	    			//console.log(instance);
	    			
	    			instance.addEndpoint(element[0].querySelector("#node1") , sourceEndpoint, {
	          	anchor: 'BottomCenter', uuid: 'node1BottomCenter'
	        	});
	        	instance.addEndpoint(element[0].querySelector("#node1") , targetEndpoint, {
	          	anchor: 'TopCenter', uuid: 'node1TopCenter'
	        	});

	        	instance.draggable(element[0].querySelectorAll(".node"), { grid: [20, 20] });
	        	//console.log('ok we are intializing');

	    		})

	    		jsPlumb.fire("jsPlumbDemoLoaded", instance);	
        }, 50);

        
    		

	  	});
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
		//console.log('ok we are in a controller');


	}
	
})();