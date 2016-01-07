(function(){
  'use strict';

  angular
    .module('app.digitalObjects')
    .controller('deleteObject', deleteObject);

  /* @ngInject */
  function deleteObject($scope, decisionFactory, dialogService, id, appStates) {
    
    var treeItem = appStates.getCurrentTreeItem();
    $scope.object = decisionFactory.getObject(id);
    
    $scope.cancel = function(){
      dialogService.modalReverse();
    }

    $scope.answer = function(type) {
      if(type === 'yes') {
        
        // this needs to be fixed. Basically i need to delete this object from decision data. 
        decisionFactory.deleteObject(id, treeItem);

        //decisionFactory.removeFromActiveObjects($scope.object);
      }
      dialogService.modalReverse();
    }
  }


  
})();