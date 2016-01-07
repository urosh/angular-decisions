(function(){
  'use strict';

  angular
    .module('app.treeModule')
    .controller('deleteTreeItem', deleteNode);

  /* @ngInject */
  function deleteNode($scope, decisionFactory, dialogService, appStates, $mdDialog) {
    $scope.object = appStates.getCurrentTreeItem();
    $scope.answer = function(type) {
      if(type === 'yes') {
        // this needs to be fixed. Basically i need to delete this object from decision data. 
        if($scope.object.type === 'nodes'){
          decisionFactory.deleteNode($scope.object.id);
        }else{
          decisionFactory.deleteConnection($scope.object.id);
        }
        $mdDialog.hide();

        //decisionFactory.removeFromActiveObjects($scope.object);
      }
      dialogService.modalReverse();
    }
  }


  
})();