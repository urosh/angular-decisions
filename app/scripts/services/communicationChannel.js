(function(){
  'use strict';

  angular.module('app.services')
    .factory('communicationChannel', CommunicationFactory);

  CommunicationFactory.$inject = ['$rootScope'];

  function CommunicationFactory($rootScope){
    var _ADD_NODE_ = '_ADD_NODE_';
    var _ADD_DOCUMENT_ = '_ADD_DOCUMENT_';
    var _REMOVE_NODE_ = '_REMOVE_NODE_';
    var _REMOVE_CONNECTION = '_REMOVE_CONNECTION';
    var _DELETE_DOCUMENT_ = '_DELETE_DOCUMENT_';
    var _EDIT_NODE_ = '_EDIT_NODE_';
    var _PREVIEW_NODE_ = '_PREVIEW_NODE_';
    var _EDIT_CONNECTION_ = '_EDIT_CONNECTION_';
    var _PREVIEW_CONNECTION_ = '_PREVIEW_CONNECTION_';
    var _NODE_SELECTED_ = '_NODE_SELECTED_';
    var _ADD_CONNECTION_SELECTED_ = '_ADD_CONNECTION_SELECTED_';
    var _CONNECT_NODES_ = '_CONNECT_NODES_';
    var _DATA_SAVED_ = '_DATA_SAVED_';
    var _ITEM_SAVED_ = '_ITEM_SAVED_';
    var _ON_ITEM_SAVED_ = '_ON_ITEM_SAVED_';
    var _SET_ANNOTATION_REGION_ = '_SET_ANNOTATION_REGION_';
    

    return {
      addDocument: addDocument,
      onAddDocument: onAddDocument,
      addNode: addNode,
      onNodeAdded: onNodeAdded,
      nodeSelected: nodeSelected,
      onNodeSelected: onNodeSelected,
      addConnectionSelected: addConnectionSelected,
      onAddConnectionSelected: onAddConnectionSelected,
      connectNodes: connectNodes,
      onConnectNodes: onConnectNodes,
      dataSaved: dataSaved,
      onDataSaved: onDataSaved,
      itemSaved: itemSaved,
      onItemSaved: onItemSaved,
      setAnnotationRegion: setAnnotationRegion,
      onAnnotationRegionSet: onAnnotationRegionSet,
      removeNode: removeNode,
      onNodeRemoved: onNodeRemoved,
      removeConnection: removeConnection,
      onRemoveConnection: onRemoveConnection 
    }
    function addDocument() {
      $rootScope.$broadcast(_ADD_DOCUMENT_);
    }

    function onAddDocument($scope, handler) {
      $scope.$on(_ADD_DOCUMENT_, function(event) {
        handler();
      });
    }


    function addNode(item) {
      $rootScope.$broadcast(_ADD_NODE_, {node: item});
    }

    function onNodeAdded($scope, handler) {
      $scope.$on(_ADD_NODE_, function(event, args) {
        handler(args.node);
      });
    }

    function nodeSelected() {
      $rootScope.$broadcast(_NODE_SELECTED_);
    }

    function onNodeSelected($scope, handler) {
      $scope.$on(_NODE_SELECTED, function(event) {
        handler();
      });
    }  
    function addConnectionSelected() {
      $rootScope.$broadcast(_ADD_CONNECTION_SELECTED_);
    }

    function onAddConnectionSelected($scope, handler) {
      $scope.$on(_ADD_CONNECTION_SELECTED_, function(event) {
        handler();
      });

    }

    function connectNodes(connection) {
      $rootScope.$broadcast(_CONNECT_NODES_, {connection: connection});
    }

    function onConnectNodes($scope, handler) {
      $scope.$on(_CONNECT_NODES_, function(event, args) {
        handler(args.connection);
      })
    }

    function dataSaved(){
      $rootScope.$broadcast(_DATA_SAVED_);
    }

    function onDataSaved($scope, handler) {
      $scope.$on(_DATA_SAVED_, function(event){
        handler();
      });
    }

    function itemSaved(data) {
      $rootScope.$broadcast(_ITEM_SAVED_, {data: data});
    }

    function onItemSaved($scope, handler) {
      $scope.$on(_ITEM_SAVED_, function(event, args) {
        handler(args.data);
      });
    }

    function setAnnotationRegion(data) {
      $rootScope.$broadcast(_SET_ANNOTATION_REGION_, {data: data});
    }

    function onAnnotationRegionSet($scope, handler) {
      $scope.$on(_SET_ANNOTATION_REGION_, function(event, args) {
        handler(args);
      });
    }

    function removeNode(data) {
      $rootScope.$broadcast(_REMOVE_NODE_, {nodeId: data.nodeId, connections: data.connections});
    }

    function onNodeRemoved($scope, handler) {
      $scope.$on(_REMOVE_NODE_, function(event, args) {
        handler(args);
      });
    }

    function removeConnection(data) {
      $rootScope.$broadcast(_REMOVE_CONNECTION, {connectionId: data.connectionId});
    }

    function onRemoveConnection($scope, handler) {
      $scope.$on(_REMOVE_CONNECTION, function(event, args) {
        handler(args);
      });
    }


    

    
  };

})();
