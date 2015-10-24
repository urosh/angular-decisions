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
          clickedNode,
          connectionStyle, 
          connectionActiveStyle;
      
      connectionStyle = {
        lineWidth: 2,
        strokeStyle: "#61B7CF",
        joinstyle: "round",
        outlineColor: "#61B7CF",
        outlineWidth: 0
      };

      connectionActiveStyle =  {
        lineWidth: 6,
        strokeStyle: "#61B7CF",
        joinstyle: "round",
        outlineColor: "#61B7CF",
        outlineWidth: 0
      };

      var targetEndpoint = {
        
        paintStyle: { fillStyle: "#ffffff", strokeStyle: "#f2f2f2", radius: 1 },
      };

      scope.nodes = []; 

      jsPlumb.ready(function () {
        instance = jsPlumb.getInstance({
          DragOptions: { cursor: 'pointer', zIndex: 2000 },
          ConnectionsDetachable   : false,
          Anchors : [ "BottomCenter", "TopCenter" ]
        });
      });
      
      communicationChannel.onAddDocument(scope, function() {
        scope.nodes = [];
        instance.detachEveryConnection();
        instance.deleteEveryEndpoint();
      });

      var i = 0;
      
      communicationChannel.onNodeAdded(scope, function(node) {
        i++;
        var id = 'node_' + i;
        id = decisionFactory.generateID();
        
        node.id = id;
        decisionFactory.saveNewNode(node);
        scope.nodes.push({'node' : node.title,'title': node.title, 'tags': node.tags, 'description': node.description, 'style': {top: '20px', left: '20px'}, 'id' : id});
        
        $timeout(function(){
          var el = document.getElementById(id);
          instance.draggable(el, {
            grid: [20, 20], 
            stop: function(event) {
              console.log(event.pos[0]);
              console.log(event.pos[1]);
            }
          });
        }, 50);
      });

      var connections = [];
      communicationChannel.onConnectNodes(scope, function(connection){
        var connection = instance.connect({
            source: connection.source, 
            target: connection.target,
            anchors:["BottomCenter", "TopCenter" ],
            endpoint: "Blank",
            connector: ["Flowchart", { stub: [20, 20], gap: 0, cornerRadius: 5 , alwaysRespectStubs: true} ],
            paintStyle: connectionStyle
          });

        //connection.setPaintStyle(connectorStyle);
        connections.push(connection);

        connection.bind("click", function(conn) {
          if(!connection.clicked) {
            
            connection.setPaintStyle(connectionActiveStyle);
            if(document.querySelector('.node.selected')){
              document.querySelector('.node.selected').classList.remove("selected");
            }
            connection.clicked = true; 
            scope.selectedConnection = connection; 
            createDecisionsCtrl.unselectNode();
            clickedNode = null;
            scope.$apply();
            createDecisionsCtrl.selectConnection();
          }else{
            scope.selectedConnection = null; 
            connection.setPaintStyle(connectionStyle);
            connection.clicked = false;
            scope.$apply();
            createDecisionsCtrl.selectConnection();
          }
        
        });
        instance.repaintEverything();

      });

      scope.nodeClicked = function(id) { 
        if (!clickedNode) {
          document.getElementById(id).className += ' selected';
          clickedNode = id;
          createDecisionsCtrl.selectNode(id);
          connections.map(function(connection) {
            if(connection.clicked) {
              scope.selectedConnection = null; 
              connection.setPaintStyle(connectionStyle);
              connection.clicked = false;
            }    
          });
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
      };

      

      
    }
  };  
  
 
})();