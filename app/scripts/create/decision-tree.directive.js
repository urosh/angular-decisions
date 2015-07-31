(function(){
  'use strict';
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
      restrict: 'E',
      link: link,
      scope: {
        selectedConnection: '=con'
      },
      require: '^createDecisions',
      templateUrl: 'scripts/create/decision.tree.tmpl.html'
    };

    return directive;
    
    function link(scope, element, attrs, createDecisionsCtrl) {
      var instance,
          clickedConnection,
          clickedNode;

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
        outlineWidth: 2,
        outlineColor: "#216477"
      },

      endpointHoverStyle = {
        fillStyle: "#216477",
        strokeStyle: "#216477"
      },
      targetEndpoint = {
        endpoint: "rectangle",
        paintStyle: { fillStyle: "#ffffff", strokeStyle: "#eb974e", radius: 125 },
      };
      // the definition of source endpoints (the small blue ones)
      /*sourceEndpoint = {
        endpoint: "Dot",
        paintStyle: {
            strokeStyle: "#eb974e",
            fillStyle: "#eb974e",
            radius: 115,
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
      },*/
      // the definition of target endpoints (will appear when the user drags a connection)
     /* targetEndpoint = {
        endpoint: "Dot",
        paintStyle: { fillStyle: "#ffffff", strokeStyle: "#eb974e", radius: 125 },
        hoverPaintStyle: endpointHoverStyle,
        
        dropOptions: { hoverClass: "hover", activeClass: "active" },
        isTarget: true,
      };*/

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
        }*/
        
        
        if (!clickedNode) {
          document.getElementById(id).className += ' selected';
          clickedNode = id;
          createDecisionsCtrl.selectNode(id);
        }else{
          if(clickedNode !== id) {
            document.getElementById(clickedNode).classList.remove("selected");
            
            document.getElementById(id).className += ' selected';
            clickedNode = id;
            createDecisionsCtrl.selectNode(id);
          }else{
            document.getElementById(clickedNode).classList.remove("selected");
            clickedNode = null;
            createDecisionsCtrl.unselectNode();
            
            
          }
        }


        

        // i need to change the state. 
        
        //instance.select().setPaintStyle({ strokeStyle:"blue", lineWidth:5 });
        //instance.select({source:"node1", target: "node2"}).setPaintStyle({ strokeStyle:"blue", lineWidth:5 });
      }


      communicationChannel.onAddDocument(scope, function() {
        scope.nodes = [];
        instance.detachEveryConnection();
        instance.deleteEveryEndpoint();
      });
      var i = 0;

      communicationChannel.onNodeAdded(scope, function(node) {
        

        i++;
        var id = "node_" + i;
        node.id = id;
        decisionFactory.addNode(node);
        //scope.nodes[id] = {'node' : node.title,'title': node.title, 'tags': node.tags, 'description': node.description, 'style': {top: '20px', left: '20px'}, 'id' : id};
        
        scope.nodes.push({'node' : node.title,'title': node.title, 'tags': node.tags, 'description': node.description, 'style': {top: '20px', left: '20px'}, 'id' : id});
        
        $timeout(function(){
          /*instance.addEndpoint(element[0].querySelector("#" + n) , sourceEndpoint, {
              anchor: 'BottomCenter', uuid: n + 'BottomCenter'
          });
          instance.addEndpoint(element[0].querySelector("#" + n) , targetEndpoint, {
              anchor: 'TopCenter', uuid: n + 'TopCenter'
          });*/
          var el = document.getElementById(id);

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
      var connections = [];

      communicationChannel.onConnectNodes(scope, function(connection){
        // ok so here i need to connect them
        var connection = instance.connect({
            source: connection.source, 
            target: connection.target,
            anchors:["BottomCenter", "TopCenter" ],
            endpointStyle: targetEndpoint,
            /*endpointStyles:[ 
                { fillStyle:"blue", outlineColor:"black", outlineWidth:1 },
                { fillStyle:"green" }
            ],*/
            connector: ["Flowchart", { stub: [20, 20], gap: 0, cornerRadius: 5 , alwaysRespectStubs: true} ],
            
          });
        
        connection.setPaintStyle(connectorPaintStyle);
          connection.bind("click", function(conn) {
               
            if(!connection.clicked) {
              
              connection.setPaintStyle({
                lineWidth: 6,
                strokeStyle: "#61B7CF",
                joinstyle: "round",
                outlineColor: "#61B7CF",
                outlineWidth: 0
              });
             connection.clicked = true; 
             scope.selectedConnection = connection; 
             scope.$apply();
             createDecisionsCtrl.selectConnection();
            }else{
              scope.selectedConnection = null; 
              connection.setPaintStyle({
                  lineWidth: 2,
                  strokeStyle: "#61B7CF",
                  joinstyle: "round",
                  outlineColor: "#61B7CF",
                  outlineWidth: 0
              });
              connection.clicked = false;
              scope.$apply();
              createDecisionsCtrl.selectConnection();
            }

            
            
          });
          instance.repaintEverything();
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
 
})();