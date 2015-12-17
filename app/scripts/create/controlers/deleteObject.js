(function(){
  'use strict';

  angular
    .module('app.buildDecisions')
    .controller('deleteObject', deleteObject);

  /* @ngInject */
  function deleteObject($scope, decisionFactory, dialogMessages, id, appStates) {
    
    var treeItem = appStates.getCurrentTreeItem();
    $scope.object = decisionFactory.getObject(id);
    
    $scope.cancel = function(){
      dialogMessages.modalReverse();
    }

    $scope.answer = function(type) {
      if(type === 'yes') {
        
        // this needs to be fixed. Basically i need to delete this object from decision data. 
        decisionFactory.deleteObject(id, treeItem);

        //decisionFactory.removeFromActiveObjects($scope.object);
      }
      dialogMessages.modalReverse();
    }
  }


  
})();