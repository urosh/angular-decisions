(function(){
  'use strict';
  angular.module('app.buildDecisions')
    .controller('editNode', editNode);

  /*$ngInject*/
  function editNode($scope, $mdDialog) {

    $scope.close = function() {
      $mdDialog.hide();
      
    }
  
    // here i will do many things.... 


  }
})();