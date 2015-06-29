(function(){
  'use strict';

  angular.module('app.buildDecisions')
    .factory('communicationChannel', CommunicationFactory);

  CommunicationFactory.$inject = ['$rootScope'];

  function CommunicationFactory($rootScope){
    var _ADD_NODE_ = '_ADD_NODE_';
    var _ADD_DOCUMENT_ = '_ADD_DOCUMENT_';
    var _REMOVE_NODE_ = '_REMOVE_NODE_';
    var _DELETE_DOCUMENT_ = '_DELETE_DOCUMENT_';
    var _EDIT_NODE_ = '_EDIT_NODE_';
    var _PREVIEW_NODE = '_PREVIEW_NODE';
    var _EDIT_CONNECTION_ = '_EDIT_CONNECTION_';
    var _PREVIEW_CONNECTION_ = '_PREVIEW_CONNECTION_';


    return {
      addDocument: addDocument,
      onAddDocument: onAddDocument,
      addNode: addNode,
      onNodeAdded: onNodeAdded,
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

    
  };

})();
