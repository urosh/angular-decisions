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
      addNode: addNode,
      onNodeAdded: onNodeAdded,
    }

    function addNode() {
      $rootScope.$broadcast(_ADD_NODE_);
    }

    function onNodeAdded($scope, handler) {
      $scope.$on(_ADD_NODE_, function(event) {
        handler();
      });
    }

    
  };

})();
