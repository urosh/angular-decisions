(function(){
  'use strict';

  angular
    .module('app.buildDecisions')
    .controller('deleteNode', deleteNode);

  /* @ngInject */
  function deleteNode($scope, decisionFactory, dialogMessages, appStates, $mdDialog) {
    $scope.object = appStates.getCurrentTreeItem();
    $scope.answer = function(type) {
      if(type === 'yes') {
        // this needs to be fixed. Basically i need to delete this object from decision data. 
        decisionFactory.deleteNode($scope.object.id);
        $mdDialog.hide();

        //decisionFactory.removeFromActiveObjects($scope.object);
      }
      dialogMessages.modalReverse();
    }
  }


  
})();